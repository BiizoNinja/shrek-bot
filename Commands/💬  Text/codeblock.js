const Discord = require('discord.js')
module.exports = {
    name: 'codeblock',
    description: 'Makes your messages in to ```code-block```',
    aliases: ["cd"],
    usage: 's!codeblock <message>',
    examples: 's!codeblock hello',
    execute:async (Client, message, args)  => {
        const fullMessage = args.slice(0).join(" ")

        if(!fullMessage) return message.reply('You need to specify something to cobeblock.')

        message.channel.send(`\`\`\`${fullMessage}\`\`\``)
    }

}