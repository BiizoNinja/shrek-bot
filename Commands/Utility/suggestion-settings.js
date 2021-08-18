const Discord = require("discord.js");
const schema = require("../../models/sugSettings-schema");
const {Permissions} = require('discord.js')

module.exports = {
  name: "suggestion-settings",
  description: "View the server's suggestion settings",
  usage: "suggestion settings [Setting] [Value]",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('<:wrong:856162786319925270> You need the \`ADMINISTRATOR\` permission to use this!')

    const setting = args[0]
    const suggestData = await schema.findOne({
      GuildID: message.guild.id
    });

    if (!suggestData) return message.channel.send('<:wrong:856162786319925270> This server hasn\'t set-up suggestions!\nRun `.setup-suggestion` to setup.')
    if (!setting) {

        const embed = new Discord.MessageEmbed()
          .setAuthor(`${message.guild.name} - Settings - Suggestions`, message.guild.iconURL({
            dynamic: true
          }))
          .setDescription(`To change any setting do \`.suggestion <Setting> <value>\``)
          .addFields({
            name: `» Suggestion Channel`,
            value: `<#${suggestData.SuggestionChannel}>`
          }, {
            name: `» Suggestion Manager Role`,
            value: `<@&${suggestData.ManagerRole}>`
          })
          .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({
            dynamic: true
          }))
          .setColor(message.guild.me.displayHexColor);
      message.channel.send({embeds: [embed]})
      
      if (args[1] == 'channel') {
        const channel = message.mentions.channels.last() || message.guild.channels.cache.get(args[2])
        if (!channel) return message.channel.send({content: `<:wrong:856162786319925270> Please mention a channel.`})

        schema.findOneAndUpdate(
          {
            GuildID: message.guild.id
          },
          {
            SuggestionChannel: channel.id
          }
        )

        message.channel.send({content: `<:greenTick:854228019312066571> Successfully updated the suggestion channel to ${channel}\nPeople can use the \`.suggest\` command and the suggestion will show up there.`})
      }

      if (value == 'role') {
        const role = message.mentions.roles.last() || message.guild.roles.cache.get(args[2])
        if (!role) return message.channel.send({content: `<:wrong:856162786319925270> Please mention a channel.`})

        schema.findOneAndUpdate(
          {
            GuildID: message.guild.id
          },
          {
            ManagerRole: role.id
          }
        )

        message.channel.send({content: `<:greenTick:854228019312066571> Successfully updated the suggestion channel to ${role.name}**\nPeople with the role can accept or deny suggestions.`})
      }
    }

  }
}