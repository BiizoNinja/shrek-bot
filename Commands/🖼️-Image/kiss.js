const Discord = require('discord.js');
const {Canvas} = require('canvacord')

module.exports = {
name: 'kiss',
description: 'kiss',
usage: 's!kiss <@user>',
cooldown: 0 ,
aliases: [''],
run: async (client, message, args) => {
 const user = message.author;
 const avatar = user.displayAvatarURL({dynamic: false, format: 'png'})

 const target = message.mentions.users.first()
 if(!target) return message.channel.send('You didn\'t mention a user to kiss...  :flushed:')
 const avatar2 = target.displayAvatarURL({dynamic: false, format: 'png'})

 const image = await Canvas.kiss(avatar, avatar2)
 const imageSend = new Discord.MessageAttachment(image, "image.png")
 message.channel.send(imageSend)

}
}