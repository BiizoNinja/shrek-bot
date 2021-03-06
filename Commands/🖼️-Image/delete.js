const Discord = require('discord.js');
const DIG = require('discord-image-generation')

module.exports = {
name: 'delete',
description: 'delete trash',
usage: '+delete',
cooldown: 0 ,
aliases: [' '],
run: async (client, message, args) => {
    const avatar = message.author.displayAvatarURL({dynamic: false , format: 'png'})

    const image = new DIG.Delete().getImage(avatar);
    const imageSend = new Discord.MessageAttachment(avatar, 'image.png')

    message.channel.send(image)

}
}