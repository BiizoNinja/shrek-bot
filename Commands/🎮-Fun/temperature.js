const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'temperature',
    description: "appends temperature on provided text",
    usage: 's!temperature <text>',
    examples: 's!temperature Hello',
    run(client, message, args) {
        const text = args.join(" ")
        if(text.length > 50 ) {
            message.channel.send('**You need to provide text fewer than 50 characters.**')
        }
        if(text.length < 50) {
        if (!text) return message.channel.send("you need some text there")
        fetch(`https://chilledcoders.ml/temp?text=${text}`)
            .then((res) => res.json())
            .then((body) => {
                
                let embed = new Discord.MessageEmbed()
                    .setImage(body.message)
                    .setColor("GOLD")
                message.channel.send(embed)
            })
    }
}

}
