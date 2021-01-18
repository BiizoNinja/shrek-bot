const Discord = require('discord.js')
module.exports = {
    name: '8ball',
    description: 'ask 8ball ANYTHING!',
    usage: 's!underline <message>',
    examples: 's!underline How are you!',
    execute: async(Client, message, args) => {
        let replies = ["Yes.", "No.", "I don't know.", "Ask again later", "Don’t count on it.", " It is certain.", " It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Outlook good", "Reply hazy, try again.", "Signs points to yes.", "Very doubtful", "Without a doubt", "Yes - Definitly", "You may rely on it."];

        let result = Math.floor((Math.random() * replies.length));

        let question = args.join(" ");


        const embed = new Discord.MessageEmbed()
            .setTitle(`8ball has answered! `)
        if (question.endsWith("?")) embed.addField(`Question: `, `${question}`, true)
        else if (!question.endsWith("?")) embed.addField(`Question: `, `${question}?`, true)
        embed.addField(`Answer: `, `${replies[result]}`)
        embed.setColor('#00ffff')
        message.channel.send(embed)


    }
}