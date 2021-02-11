module.exports = {
    name : 'translate',
    description: "Translate Certain Text!",
    usage: "s!translate [text] ",
    execute: async(Client, message, args) => {
        const Discord = require('discord.js')
        const translate = require('translate')

        const toTranslate = args.join(' ')
        const translation = await translate(toTranslate, {to: "es"})
        
        if(!toTranslate) {
            message.channel.send('You need to specify something to translate!')
        }

        let embed = new Discord.MessageEmbed()
        .setTitle('Translation done!')
        .addFields(
            {name: 'Your translation', value: `\`\`\`${toTranslate}\`\`\``},
            {name: 'Result', value: `\`\`\`${translation}\`\`\``}
        )
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .setColor("CYAN")

        message.channel.send(embed)
    }
}