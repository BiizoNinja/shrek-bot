const Discord = require('discord.js');
const {Canvas} = require('canvacord')

module.exports = {
name: 'burn',
description: 'burn ur pfp',
usage: '+burn',
cooldown: 0 ,
aliases: [''],
run: async (client, message, args) => {
 const user = message.author;
 const avatar = user.displayAvatarURL({dynamic: false, format: 'png'})

 const lvl = 50;
 const image = await Canvas.burn(avatar, lvl)
 const imageSend = new Discord.MessageAttachment(image, "burn.png")
 message.channel.send(imageSend)

}

}