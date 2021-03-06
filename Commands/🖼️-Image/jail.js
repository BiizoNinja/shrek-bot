const Discord = require('discord.js');
const {Canvas} = require('canvacord');
const { greyscale } = require('canvacord/src/Canvacord');

module.exports = {
name: 'jail',
description: 'jail',
usage: '+jail',
cooldown: 0 ,
aliases: [''],
run: async (client, message, args) => {
 const user = message.author;
 const avatar = user.displayAvatarURL({dynamic: false, format: 'png'})

 const image = await Canvas.jail(avatar, greyscale = false)
 const imageSend = new Discord.MessageAttachment(image, "image.png")
 message.channel.send(imageSend)

}
}