const Discord = require('discord.js');
const {Canvas} = require('canvacord')

module.exports = {
name: 'blur',
description: 'blurry?',
usage: '+blur',
cooldown: 0 ,
aliases: [''],
run: async (client, message, args) => {
 const user = message.author;
 const avatar = user.displayAvatarURL({dynamic: false, format: 'png'})

 const image = await Canvas.blur(avatar)
 const imageSend = new Discord.MessageAttachment(image, "blur.png")
 message.channel.send(imageSend)

}

}