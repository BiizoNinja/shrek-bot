const Discord = require('discord.js');
const {Canvas} = require('canvacord')

module.exports = {
name: 'affect',
description: 'No, it doesn\'t affect my child-',
usage: 's!affect',
cooldown: 0 ,
aliases: [''],
run: async (client, message, args) => {
 const user = message.author;
 const avatar = user.displayAvatarURL({dynamic: false, format: 'png'})

 const image = await Canvas.affect(avatar)
 const imageSend = new Discord.MessageAttachment(image, "affect.png")
 message.channel.send(imageSend)

}
}