const Discord = require('discord.js');
const ms = require('ms')
const muteSchema = require('../../models/muterole')
const { emojis, colors, others } = require('../../assets.json')

module.exports = {
  name: 'mute',
  description: 'Mute other users!',
  usage: 'mute <user> <time>',
  aliases: ['silence'],
  run: async (client, message, args) => {
    
      if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply({ content: `${emojis.wrong} You need the \`MANAGE_ROLES\` permission to use this!` })
      
        const data = await muteSchema.findOne({
            GuildID: message.guild.id
        });
      
      if (!data) return message.reply({ content: `${emojis.wrong} This server doesn't have a mute role set up! Please run \`.setmuterole <role>\`` })

      const member = message.mentions.members.first()
      if (!member) return message.reply({ content: `${emojis.wrong} Please mention a member to mute!` })
      if(member.user.id == message.author.id) return message.reply({ content: `${emojis.wrong} You cannot mute yourself!` })
      if (member.user.id == message.guild.ownerId) return message.reply({ content: `${emojis.wrong} You cannot mute the server owner!` })
      if (member.roles.highest.position > message.guild.me.roles.highest.position) return message.reply({ content: `${emojis.wrong} I cannot mute this user due to role hierarchy.` })
      if (member.user.bot) return message.reply({content: `${emojis.worng} You cannot mute bots!`})
      
      const time = args[1]
      if (!time) return message.reply({ content: `${emojis.wrong} Please mention the duration of mute!` })
      const msTime = ms(time)
      
      member.roles.add(data.MuteRole)
      message.reply({ content: `${emojis.success} Successfully muted **${member.user.tag}** for ${time}.` })
      
      setTimeout(() => {
          member.roles.remove(data.MuteRole)
          member.user.send(`You have been unmuted in **${message.guild.name}**`)
      }, msTime);

  } 
}