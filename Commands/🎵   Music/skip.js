const Discord = require('discord.js')
const distube = require('distube');
const { QueryCursor } = require('mongoose');


module.exports = {
    name: 'skip',
    description: 'With this command, you can skip the song which is been playing on ShrekBot',
    usage: 's!skip',
    execute: async (Client, message, args) => {

    if(!message.member.voice.channel) {
        return message.reply('What do you want to skip?! You need to be in a voice channel ya dummy.')
        }
    
    let queue = Client.distube.getQueue(message);

    if(queue) {
    const music = args.join(" ")

    Client.distube.skip(message, music)
    message.channel.send(`Ok. Skipped (didn't you like it?)`)

    }
    }
}