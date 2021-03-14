const Discord = require('discord.js');
const {Canvas} = require('canvacord');

module.exports = {
name: 'invert',
description: 'invert ur pfp',
usage: '+invert',
cooldown: 0 ,
aliases: [''],
run: async (client, message, args) => {
 const user = message.author;
 const avatar = user.displayAvatarURL({dynamic: false, format: 'png'})

 const image = await Canvas.invert(avatar)
 const imageSend = new Discord.MessageAttachment(image, "image.png")
 message.channel.send(imageSend)

}

}