const Discord = require('discord.js');
const schema = require('../../models/sugSettings-schema')

module.exports = {
    name: 'setup-suggestion',
    description: 'Set up suggestion for a server',
    usage: 'setup-suggestion',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('<:wrong:856162786319925270> You need the \`ADMINISTRATOR\` permission to use this!')

        const data = await schema.findOne({
            GuildID: message.guild.id
        });

        if (data) return message.channel.send({ content: '<:wrong:856162786319925270> You already have sey-up tickets in this server!' })

        if (!data) {

            const channelEmbed = new Discord.MessageEmbed()
                .setAuthor(`Suggestions — ${message.guild.name} — 1/2 `, message.guild.iconURL({
                    dynamic: true
                }))
                .setDescription('What channel whould you like the suggestion to show up?')
                .setColor('#A6FE00')
            message.channel.send({embeds: [channelEmbed]})

            await startMessageCollectors(
                client,
                message,
                args,
                (m) =>
                m.author.id == message.author.id && m.channel.id == message.channel.id
            );

            function startMessageCollectors(client, message, args, filter) {

                const channelColl = new Discord.MessageCollector({messagechannel, filter, max: 10})

                channelColl.on('collect', async (msg) => {
                    let channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(msg.content)
                    if (!channel) {
                      msg.channel.send({ content: '<:wrong:856162786319925270> You need to mention a channel! Set-up failed'})
                        channelColl.stop();
                    } else {
                        const roleEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Suggestions — ${message.guild.name} — 2/2 `, message.guild.iconURL({
                             dynamic: true
                        }))
                        .setDescription('What role should the users must have to approve or deny suggestion?')
                        .setColor('#A6FE00')
                        message.channel.send({embeds: [roleEmbed]})
                        channelColl.stop();
                    }
                    const roleColl = new Discord.MessageCollector(
                        message.channel,
                        filter, {
                            max: 10
                        }
                    )

                    roleColl.on('collect', async (msg) => {
                        let role = msg.mentions.roles.first() || msg.guild.roles.cache.get(msg.content)
                        if (!role) {
                            msg.channel.send({ content: '<:wrong:856162786319925270> You need to mention a role! Set-up failed' })
                            roleColl.stop();
                        } else {
                        const finishEmbed = new Discord.MessageEmbed()
                                .setAuthor(`Suggestions — ${message.guild.name} — Completed `, message.guild.iconURL({
                                    dynamic: true
                                }))
                                .setDescription('Success! You have finished the suggestions setup, members can now `.suggest <suggestion>` to suggest!')
                                .setColor('#A6FE00')
                            message.channel.send({embeds: [finishEmbed]})
                            roleColl.stop();
                        }
                        await new schema({
                            GuildID: message.guild.id,
                            SuggestionChannel: channel.id,
                            ManagerRole: role.id
                        }).save();

                    })
                })

            };
        }
    }
}