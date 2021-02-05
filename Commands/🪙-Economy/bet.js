const Discord = require('discord.js')
const economy = require('../../economy')

module.exports = {
    name: 'bet',
    description: 'bet your coins ',
    usage: 's!bet <amount-of-coins>',
    timeout: 60000,
    aliases: [],
    execute: async(Client, message, args) => {
        const userID = message.author.id
        const guildID = message.guild.id

        const amount = args[0]

        if(!amount) return message.channel.send(`<a:IntenseTHONK:775021842351521822> what do you want to bet?! specify an amount`)
        if(isNaN(amount)) return message.channel.send(`bro you need to bet a number in your wallet.`)

        const amountToBet = parseInt(amount)
        const bal = economy.getCoins(userID)

        if(bal(message.author.id) < amountToBet) return message.channel.send(`you don't that kinda money in yer wallet. How can you bet something you don't have? :thinking:`)

        function random() {
            const num = Math.floor(Math.random()* 2)
            return num === 1;

        }
        if(random() === true) {
            const winAmout = amountToBet * 2
            message.channel.send(`gg, you won **${winAmout}** <:Shrek_Coin:807140320507854878>. atleast your luck is better than my future :clap: `)
            await economy.addCoins(userID, winAmout)

        } else {
            message.channel.send(` haha i have a lucky charm! You just lost **${amountToBet}** coins :rofl: try again next time kid`)
            await economy.removeCoins(userID, amountToBet)

        }
    }
}