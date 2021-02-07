const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const Discord = require('discord.js')

module.exports = {
    name: 'play',
    description: "play a song!",
    timemout: 10000,
    usage: 's!play <song name | url>',
    examples: 's!play cool song',
    aliases: ["p"],
    execute: async(Client, message, args) => {
        const voiceChannel = message.member.voice.channel;
 
        if (!voiceChannel) return message.channel.send('You need to be in a channel to execute this command!');

        if (!args.length) return message.channel.send('You need to send the second argument!');
 
        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }
 
        if(validURL(args[0])){
 
            const connection = await voiceChannel.join();
            const stream  = ytdl(args[0], {filter: 'audioonly'});
            const video = await validURL(args[0]);

            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
                message.channel.send('leaving channel');
            });
 
            await message.channel.send(`Now Playing ${video} `)
 
            return
        }
 
        
        const  connection = await voiceChannel.join();
 
        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);
 
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
 
        }
 
        const video = await videoFinder(args.join(' '));
 
        if(video){
            const stream  = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek: 0, volume: 1})
            .on('finish', () =>{
                voiceChannel.leave();
            });
            let embed = new Discord.MessageEmbed()
            .setTitle('Play Command! <a:peepoSing:798873229539409931>')
            .setDescription(`ShrekBot music system!`)
            .addFields(
                {name: 'Currenty Playing', value: `\`${video.title}\``},
                {name: 'Duration', value: `\`${video.timestamp}\``},
                {name: 'Views', value: `\`${video.views}\` `}
            )
            .setColor("GREEN")
 
            await message.channel.send(embed)
        } else {
       
            message.channel.send('No video results found');
        }
    }
}
 
    
