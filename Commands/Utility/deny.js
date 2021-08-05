const Discord = require('discord.js');
const settingsSch = require('../../models/sugSettings-schema')
const serverSch = require('../../models/sugServer-schema');

module.exports = {
    name: 'deny',
    description: 'deny suggestions',
    usage: 'deny <suggestID> <reason>',
    run: async (client, message, args) => {

        const settingsData = await settingsSch.findOne({
            GuildID: message.guild.id
        });

        if (!settingsData) return message.channel.send(`<:wrong:856162786319925270> No suggestion settings have been set-up in this server!`)
        if (settingsData) {
            if (settingsData.SuggestionChannel == 'None') return message.channel.send(`<:wrong:856162786319925270> No suggestion channel has been setup.`)
            if (settingsData.ManagerRole == 'None') return message.channel.send(`<:wrong:856162786319925270> No suggestion manager role has been setup.`)
        };

        const suggestionChannel = message.guild.channels.cache.get(settingsData.SuggestionChannel)
        const managerRole = message.guild.roles.cache.get(settingsData.ManagerRole)

        if (!message.member.roles.cache.has(managerRole.id)) return message.channel.send('<:wrong:856162786319925270> You don\'t have proper perms!')

        const sugID = args[0]
        if (!sugID) return message.channel.send(`<:wrong:856162786319925270> Please mention a suggestion ID.`)
        const serverData = await serverSch.findOne({
            GuildID: message.guild.id
        });

        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(`<:wrong:856162786319925270> Please mention a reason of denial.`)

        if (!serverData) return message.channel.send(`<:wrong:856162786319925270> No suggestions have been made in this server!`)
        if (serverData) {
            const suggestionExists = await serverSch.findOne({
                SuggestID: sugID
            });

            if (!suggestionExists) return message.channel.send(`<:wrong:856162786319925270> Couldn\'t find any suggestion with the id \`${sugID}\``)
            if (suggestionExists) {
                const suggestor = message.guild.members.cache.get(suggestionExists.Suggestor)
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`Suggestion Denied!`)
                    .setDescription(suggestionExists.Suggestion)
                    .addFields({
                        name: `Reason of denial`,
                        value: reason
                    }, {
                        name: `Suggested by`,
                        value: `<@${suggestionExists.Suggestor}>`
                    })
                    .setColor('#FF2121')
                    .setFooter(`Approved by: ${message.author.tag}`, message.author.displayAvatarURL({
                        dynamic: true
                    }));
                const msg = await suggestionChannel.send(embed)
                message.channel.send(`<:greenTick:854228019312066571> Successfully denied suggestion.`)
                suggestor.send(`Your suggestion was denied!\nhttps://discord.com/channels/${message.guild.id}/${suggestionChannel.id}/${msg.id}`)
            }

        };

    }
}