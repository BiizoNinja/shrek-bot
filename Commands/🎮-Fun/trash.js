const fetch = require('node-fetch')
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'trash',
    description: "you become trash",
    usage: 's!trash [@user]',
    examples: 's!trash || s!trash @BiizoNinja',
    run: async(client, message, args) => {
        const user = message.mentions.users.first()

        if(!user) {
        const avatarURL = message.author.displayAvatarURL({dynamic: true})
        fetch(`https://nekobot.xyz/api/imagegen?type=trash&url=${avatarURL}`)
            .then((res) => res.json())
            .then((body) => {

                let embed = new MessageEmbed()
                    .setImage(body.message)
                    .setColor("GOLD")
                message.channel.send(embed)
            })

        }
        if(user) {
            const userURL = user.displayAvatarURL({dynamic: true})
            fetch(`https://nekobot.xyz/api/imagegen?type=trash&url=${userURL}`)
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