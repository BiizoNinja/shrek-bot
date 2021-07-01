const Discord = require('discord.js')
module.exports = {
    name: 'codeblock',
    description: 'Makes your messages in to ```code-block```',
    aliases: ["cd"],
    usage: '+codeblock <message>',
    examples: '+codeblock hello',
    run:async (client, message, args)  => {
        const fullMessage = args.slice(0).join(" ")

        if(!fullMessage) return message.reply('You need to specify something to cobeblock.')

        message.channel.send(`\`\`\`${fullMessage}\`\`\`\n\nRequested by: ${message.author.tag}`)
    }

}
