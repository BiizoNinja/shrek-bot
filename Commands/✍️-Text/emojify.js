const Discord = require('discord.js')
const emoji = require('discord-emoji-convert')

module.exports = {
    name: 'emojify',
    description: 'Makes your text into emojie+',
    aliases: ["emoji"],
    usage: '+emojify <message>',
    examples: '+emojify hello',
    run: async(client, message, args) => {
        const fullMessage = args.join(' ')

        if(!fullMessage) return message.channel.send(`You need to specify something to emojify.`)

        const result = emoji.convert(fullMessage)
        message.channel.send(result)
    }
 }
 
