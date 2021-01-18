const Discord = require('discord.js')
module.exports = {
    name: 'strikethrough',
    description: 'Makes your messages in to ~~strikethrough~~',
    aliases: ["st"],
    usage: 's!strikethrough <message>',
    examples: 's!strikethrough hello',
    execute:async (Client, message, args)  => {
        const fullMessage = args.slice(0).join(" ")

        if(!fullMessage) return message.reply('You need to specify something to strikethrough.')

        message.channel.send(`~~${fullMessage}~~`)
    }

}