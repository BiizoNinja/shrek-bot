const Discord = require('discord.js');
const memberSchema = require('../../models/memberRole')
const muteSchema = require('../../models/muterole')
const logSchema = require('../../models/logchannel')
const {emojis, colors} = require('../../assets.json')

  module.exports = {
    name: 'settings',
    description: 'View the server\'s settings',
    usage: 'settings',
    aliases: ['conf', 'config', 'server-conf'],
      run: async (client, message, args) => {
      
        if (!message.member.permissions.has(`ADMINISTRATOR`)) return message.reply({content: `${emojis.wrong} You need the \`ADMINISTRATOR\` permission to use this!`, allowedMentions: {repliedUser: false}})
        
        const memData = await memberSchema.findOne({ GuildID: message.guild.id })
        const muteData = await muteSchema.findOne({ GuildID: message.guild.id })
        const logsData = await logSchema.findOne({ GuildID: message.guild.id })
          
        let memMsg = ""
        let muteMsg = ""
        let logMsg = ""

        if (memData) {memMsg = `${emojis.success} — <@&${memData.MemberRole}>` }
        if (!memData) {memMsg = `${emojis.wrong} — None`}

        if (muteData) {muteMsg = `${emojis.success} — <@&${muteData.MuteRole}>` }
        if (!muteData) { muteMsg = `${emojis.wrong} — None` }
        
        
        const settingsEmbed = new Discord.MessageEmbed()
          .setAuthor(`Server Settings for ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
          .setDescription(`Here are all the settings of this server`)
          .addFields(
            {name: `Member Role`, value: memMsg, inline: true },
            {name: `Mute Role`, value: muteMsg, inline: true },
            )
          .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynmaic: true }))
          .setColor(colors.successcolor)
        
        message.reply({embeds: [settingsEmbed], allowedMentions: {repliedUser: false}})
  }
}