const Discord = require('discord.js')
module.exports = {
    name: 'flip',
    description: 'Flip a coin!',
    usage: 's!flip',
    examples: 's!flip',
    execute: async(Client, message, args) => {
        let replies = ["Heads", "Tails"];

        let result = Math.floor((Math.random() * replies.length));

        message.channel.send('Fliping a Coin').then(msg => msg.edit(`> :coin: The Result was **${replies[result]}**`))
    }
}