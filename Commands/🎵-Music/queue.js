const Discord = require('discord.js');

module.exports = {
name: 'queue',
description: ' Get the bot\'s queue!',
usage: '+queue',
cooldown: 0 ,
aliases: ['q'],
run: async (client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use this command!')

    let queue = distube.getQueue(message)
    if(queue) return message.channel.send('There is no song being played right now!')
    
    const mappedValue = queue.songs.map((song, id) => {
        `**${id + 1}**. ${song.name} - ${song.formattedDuration}`
    }).slice(0, 10).join("\n");

    const embed = new Discord.MessageEmbed()
    .setTitle(`Queue for ${message.guild.name}`)
    .setDescription(mappedValue)
    .setTimestamp()
    .setColor(`RANDOM`)

    message.channel.send(embed)
}
}