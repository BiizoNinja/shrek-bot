const Discord = require('discord.js')
const distube = require('distube')

module.exports = {
    name: 'set-volume',
    description: 'You can configure the volume using this command!',
    examples: 's!set-volume 50%',
    usage: 's!set-volume <VALUE>',
    aliases: ["sv", "setvolume"],
    execute: async(Client, message, args) => {
        const value = args[0]

        if(message.member.hasPermission('MANAGE_MESSSAGES')) return 
        if(!message.member.voice.channel) return message.channel.send('you need to be in a voice channel...')
        if(!args[0]) return message.reply('you need to set a value dummy...')

        distube.setVolume(message, value)
        message.channel.send(`Successfully set the volume to ${value}`)
        
    }
}
