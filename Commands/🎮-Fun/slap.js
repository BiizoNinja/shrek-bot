// https://vacefron.nl/api//batmanslap?[&batman=USER_AVATAR][&robin=USER_AVATAR]

const Discord = require('discord.js');
const fetch  = require('node-fetch')

module.exports = {
name: 'slap',
description: 'slaps users!',
usage: 's!slap <@user>',
cooldown: 0 ,

run: async (client, message, args) => {
    const target  = message.mentions.users.first()
    if(!target) return message.channel.send('Please specify a user to slap...')

    const authorAvatarUrl = message.author.displayAvatarURL()
    const targetURL = target.displayAvatarURL()

    fetch(`https://vacefron.nl/api//batmanslap?[&batman=${authorAvatarUrl}][&robin=${targetURL}]`)
    .then((res) => res.json())
    .then((body) => {
        let embed = new MessageEmbed()
        .setImage(body.message)
        .setColor("RANDOM")
    message.channel.send(embed)
    })

}
}