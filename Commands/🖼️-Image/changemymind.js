const Discord = require('discord.js');
const { Canvas } = require('canvacord')
module.exports = {
name: 'changemymind',
description: 'changemymind',
usage: '+changemymind <text>',
cooldown: 0 ,
aliases: ['cmm '],
run: async (client, message, args) => {
 const text = args.join(' ')
 if(!text) return message.channel.send('Please provide some text!')
 if(text > 70) return message.channel.send('Please provide some text, that is lesser that 70 character+')

 const image = await Canvas.changemymind(text)
 const imageSend = new Discord.MessageAttachment(image, "cmm.png")
 message.channel.send(imageSend)


}
}