const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'baguette',
    description: "appends baguette on provided text",
    usage: 's!baguette <text>',
    examples: 's!baguette Hello',
    run: async(client, message, args) => {
        const avatarURL = message.author.displayAvatarURL({dynamic: true})
        fetch(`https://nekobot.xyz/api/imagegen?type=baguette&url=${avatarURL}`)
            .then((res) => res.json())
            .then((body) => {
                let replies = ["Hmm! tasty baguette", "pog some tast bread","awww look at you eating baguettes! getting fancy eh?"]
                let result = Math.floor((Math.random() * replies.length));

                let embed = new MessageEmbed()
                    .setImage(body.message)
                    .setColor("GOLD")
                    .setTitle(`${replies[result]}`)
                message.channel.send(embed)
            })

    }
}

