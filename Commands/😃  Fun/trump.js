const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js');
const { textSync } = require('figlet');

module.exports = {
    name: 'trump',
    description: "appends trump tweet on provided text",
    usage: 's!trump <text>',
    examples: 's!trump Hello',
    aliases: ['trumptweet'],

    execute(Client, message, args) {
        const text = args.join(" ")
        if(text.length > 50 ) {
            message.channel.send('You need to provide text fewer that 50 characters.')
        }
        if (!text) return message.channel.send("you need some text there")
        fetch(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`)
            .then((res) => res.json())
            .then((body) => {
                
                let embed = new MessageEmbed()
                    .setImage(body.message)
                    .setColor("GOLD")
                message.channel.send(embed)
            })
    }

}