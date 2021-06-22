const Discord = require('discord.js')
module.exports = {
    name: 'bold',
    description: 'Makes your messages in to **bold**',
    aliases: ["bold"],
    usage: '+boldify <message>',
    examples: '+boldify hello',
    run: async (client, message, args) => {
        const fullMessage = args.slice(0).join(" ")

        if(!fullMessage) return message.reply('You need to specify something to bold.')

        message.channel.send(`**${fullMessage}**`)
    
    } 


}