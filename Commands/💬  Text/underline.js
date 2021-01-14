const Discord = require('discord.js')
module.exports = {
    name: 'underline',
    description: 'Makes your messages in to __underline__',
    aliases: ["ul"],
    usage: 's!underline <message>',
    examples: 's!underline hello',
    run:async (Client, message, args)  => {
        const fullMessage = args.slice(0).join(" ")

        if(!fullMessage) return message.reply('You need to specify something to underline.')

        message.channel.send(`__${fullMessage}__`)
    }

}