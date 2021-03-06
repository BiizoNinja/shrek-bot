const Discord = require('discord.js');
const {Canvas} = require('canvacord')

module.exports = {
name: 'beautiful',
description: 'Oh this? This is beautiful!',
usage: '+beautiful',
cooldown: 0 ,
aliases: [''],
run: async (client, message, args) => {
 const user = message.author;
 const avatar = user.displayAvatarURL({dynamic: false, format: 'png'})

 const image = await Canvas.beautiful(avatar)
 const imageSend = new Discord.MessageAttachment(image, "beauti.png")
 message.channel.send(imageSend)

}
}