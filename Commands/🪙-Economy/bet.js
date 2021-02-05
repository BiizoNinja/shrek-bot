const Discord = require('discord.js')
const economy = require('../../economy')

module.exports = {
    name: 'bet',
    description: 'bet your coins ',
    usage: 's!bet <amount-of-coins>',
    timeout: 600000,
    aliases: [],
    execute: async(Client, message, args) => {
        const userID = message.author.id
        const guildID = message.guild.id

        const amount = args[0]

        if(!amount) return message.channel.send(`<a:IntenseTHONK:775021842351521822> what do you want to bet?! specify an amount`)
        if(isNaN(amount)) return message.channel.send(`bro you need to bet a number in your wallet.`)

        const amountToBet = parseInt(amount)
        const bal = economy.getCoins(userID, guildID)

        console.log(`${message.author.tag} USED THE COMMAND in ${message.guild.name}`)
        message.reply('IN PROGRESS :eyes:')
    }
}