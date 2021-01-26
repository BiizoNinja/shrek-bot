const Discord = require('discord.js')
module.exports = {
    name: 'flip',
    description: 'Flip a coin!',
    usage: 's!flip',
    examples: 's!flip',
    execute: async(Client, message, args) => {
        let replies = ["Heads", "Tails"];

        let result = Math.floor((Math.random() * replies.length));

        const flip  = await message.channel.send('Fliping a Coin!')
        setTimeout (() => {
            msg.edit(`> :coin:  I flipped ${replies[result]} `)
        }, 1000);
    }
}