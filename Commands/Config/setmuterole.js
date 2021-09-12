const Discord = require('discord.js');
const schema = require('../../models/muterole')
const {emojis, colors, others} = require('../../assets.json')

module.exports = {
name: 'setmuterole',
description: 'You can set the server\'s mute role to use the `mute` command!',
usage: 'setmuterole <role>',
aliases: ['setmute'],
    run: async (client, message, args) => {
    
      if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply({ content: `${emojis.wrong} You need the \`ADMINISTRATOR\` permission to use this!`, allowedMentions:{repliedUser: false} })
      
        const data = await schema.findOne({
            GuildID: message.guild.id
        });
        
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if (!role) return message.reply({content: `${emojis.wrong} Please mention a role!`, allowedMentions: {repliedUser: false}})
        
        const successEmbed = new Discord.MessageEmbed()
            .setAuthor('Success', others.green_circle)
            .setDescription(`${emojis.success} Successfully set the Mute role to **${role.name}** `)
            .setColor(colors.successcolor)

        if (!data) {
          
            new schema({
                GuildID: message.guild.id,
                MuteRole: role.id
            }).save();
        
           message.reply({embeds: [successEmbed], allowedMentions: {repliedUser: false}})
        }
        
        if (data) {

             schema.findOneAndUpdate(
              {GuildID: message.guild.id,},
                 { MuteRole: role.id, }

            );
            message.reply({embeds: [successEmbed], allowedMentions: {repliedUser: false}})
        }
 }
}