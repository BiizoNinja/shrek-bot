const Discord = require('discord.js')
const distube = require('distube')


module.exports = {
    name: 'play',
    description: 'With this command, you can play any song using ShrekBot',
    usage: 's!play <SONG NAME OR URL>',
    examples: 's!play RickRoll',
    aliases: ['p'],
    run: async (Client, message, args) => {
        

    const music = args.join(" ")
    if(!message.member.voice.channel) return message.reply('You need to join a voice channel... to play music? Becuase that\'s how physics works i think...')

    Client.distube.play(message, music)


    }
}