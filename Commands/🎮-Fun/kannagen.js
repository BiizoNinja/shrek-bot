const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js');
const { textSync } = require('figlet');

module.exports = {
    name: 'kannagen',
    description: "appends kannagen on provided text",
    usage: 's!kannagen <text>',
    examples: 's!kannagen Hello',
    execute(Client, message, args) {
        const text = args.join(" ")
        if(text.length > 50 ) {
            message.channel.send('**You need to provide text fewer than 50 characters.**')
        }
        if(text.length < 50) {
        if (!text) return message.channel.send("you need some text there")
        fetch(`https://nekobot.xyz/api/imagegen?type=kannagen&text=${text}`)
            .then((res) => res.json())
            .then((body) => {
                
                let embed = new MessageEmbed()
                    .setImage(body.message)
                    .setColor("GOLD")
                message.channel.send(embed)
            })
    }
}

}