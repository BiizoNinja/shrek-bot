const Discord = require('discord.js')

module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    usage: '+leave',
    examples: '+leave',
    aliases: ["disconnect"],
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You don\'t have the right permissions')
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music!");
        await voiceChannel.leave();
        await message.channel.send('Leaving channel ')
 
    }
    
}