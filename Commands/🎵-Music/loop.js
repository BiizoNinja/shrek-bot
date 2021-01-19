const Discord = require('discord.js')
const distube = require('distube')


module.exports = {
    name: 'repeat',
    description: 'With this command, you can loop any song using ShrekBot',
    usage: 's!repeat <SONG NAME OR URL>',
    aliases: ['loop'],
    execute: async (Client, message, args) => {
        let queue = Client.distube.getQueue(message);

        if(queue) {
        const music = args.join(" ")
    
        Client.distube.setRepeatMode(message,parseInt(args[0]))
        message.channel.send(`Repeated Queue!`)
    
        }if(!message.member.voice.channel) {
            return message.reply('What do you want to loop?! You need to be in a voice channel ya dummy.')
        }
    
        }
    }