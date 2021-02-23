const Discord = require('discord.js')
const emoji = require('discord-emoji-convert')

module.exports = {
    name: 'emojify',
    description: 'Makes your text into emojies!',
    aliases: ["emoji"],
    usage: 's!emojify <message>',
    examples: 's!emojify hello',
    run: async(client, message, args) => {
        const fullMessage = args.join(' ')

        if(!fullMessage) return message.channel.send(`You need to specify something to emojify.`)

        const result = emoji.convert(fullMessage)
        message.channel.send(result)
    }
 }
