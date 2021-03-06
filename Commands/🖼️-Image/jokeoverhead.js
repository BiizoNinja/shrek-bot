const Discord = require('discord.js');
const {Canvas} = require('canvacord');
const { greyscale } = require('canvacord/src/Canvacord');

module.exports = {
name: 'jokeoverhead',
description: 'whoosh',
usage: 's!jokeoverhead',
cooldown: 0 ,
aliases: ['joh'],
run: async (client, message, args) => {
 const user = message.author;
 const avatar = user.displayAvatarURL({dynamic: false, format: 'png'})

 const image = await Canvas.jokeOverHead(avatar)
 const imageSend = new Discord.MessageAttachment(image, "image.png")
 message.channel.send(imageSend)

}
}