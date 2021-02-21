const Discord = require('discord.js')
const ms = require('parse-ms')

module.exports = {
    name: 'daily',
    description: 'get coins for free',
    usage: 's!daily',
    timeout: 86400000,
    aliases: [],
    execute: async(Client, message, args) => { 

     const userID = message.author.id 
     let coins = 2500; 

     let embed = new Discord.MessageEmbed()
     .setTitle('Daily Coins!')
     .setDescription(`<a:TICK:801450801200758795> The sum  of **${coins}** <:Shrek_Coin:807140320507854878> were placed in your wallet! Come back tomorrow for more`)
     .setTimestamp()
     .setColor('RANDOM')

     await economy.addCoins(userID, coins)
     message.channel.send(embed)

    }
}