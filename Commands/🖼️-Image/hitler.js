const Discord = require('discord.js');
const {Canvas} = require('canvacord')

module.exports = {
name: 'hitler',
description: 'Worse that hitler',
usage: 's!hitler',
cooldown: 0 ,
aliases: [''],
run: async (client, message, args) => {
 const user = message.author;
 const avatar = user.displayAvatarURL({dynamic: false, format: 'png'})

 const image = await Canvas.hitler(avatar)
 const imageSend = new Discord.MessageAttachment(image, "hitler.png")
 message.channel.send(imageSend)

}
}