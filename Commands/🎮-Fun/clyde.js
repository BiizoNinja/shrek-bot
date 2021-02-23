const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js');
const { textSync } = require('figlet');

module.exports = {
    name: 'clyde',
    description: "appends clyde on provided text",
    usage: 's!clyde <text>',
    examples: 's!clyde',
    run: async(client, message, args) => {
        const text = args.join(" ")
        if(text.length > 50 ) {
            message.channel.send('**You need to provide text fewer than 50 characters.**')
        }
        if(text.length < 50) {
        if (!text) return message.channel.send("you need some text there")
        fetch(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`)
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