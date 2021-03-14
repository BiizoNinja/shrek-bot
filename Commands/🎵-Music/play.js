const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const Discord = require('discord.js');
const DisTube = require('distube');

module.exports = {
    name: 'play',
    description: "play a song!",
    timemout: 10000,
    usage: '+play <song name | url>',
    examples: '+play cool song',
    aliases: ["p"],
    run: async(client, message, args) => {

        const voiceChannel = message.member.voice.channel;
 
        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');

        if (!args.length) return message.channel.send('provide a song to play ');

        const music = args.join(' ')
        distube.play(message, music)
 
    }
    
}    