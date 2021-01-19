const Discord = require('discord.js')
const distube = require('distube');
const { QueryCursor } = require('mongoose');


module.exports = {
    name: 'stop',
    description: 'With this command, you can stop the song which is been playing on ShrekBot',
    usage: 's!stop',
    aliases: ['sp','stop-playing'],
    execute: async (Client, message, args) => {
    if(message.member.hasPermission('MANAGE_MESSAGES')) return

    if(!message.member.voice.channel) {
        return message.reply('What do you want to stop?! You need to be in a voice channel ya dummy.')
    }
    
    let queue = Client.distube.getQueue(message);

    if(queue) {
    const music = args.join(" ")

    Client.distube.stop(message, music)
    message.channel.send('Thanks for listening to my music! Bye Bye! :wave:')

}

    }
}