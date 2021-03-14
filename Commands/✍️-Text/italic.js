
const Discord = require('discord.js')
module.exports = {
    name: 'italic',
    description: 'Makes your messages in to *italic*',
    aliases: ["italify"],
    usage: '+italic <message>',
    examples: '+italic hello',
    run:async (client, message, args)  => {
        const fullMessage = args.slice(0).join(" ")

        if(!fullMessage) return message.reply('You need to specify something to make italic.')

        message.channel.send(`*${fullMessage}*`)
    }

}
