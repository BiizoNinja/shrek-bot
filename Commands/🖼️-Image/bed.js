const Discord = require('discord.js');
const {Canvas} = require('canvacord')

module.exports = {
name: 'bed',
description: 'bed',
usage: 's!bed <@user>',
cooldown: 0 ,
aliases: [''],
run: async (client, message, args) => {
 const user = message.author;
 const avatar = user.displayAvatarURL({dynamic: false, format: 'png'})

 const target = message.mentions.users.first()
 if(!target) return message.channel.send('You didn\'t mention a user to bed...')
 const avatar2 = target.displayAvatarURL({dynamic: false, format: 'png'})

 const image = await Canvas.bed(avatar, avatar2)
 const imageSend = new Discord.MessageAttachment(image, "bed.png")
 message.channel.send(imageSend)

}
}