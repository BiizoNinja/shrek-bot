const Discord = require('discord.js')
const economy = require('../../money')

module.exports = {
name: 'work',
description: 'work for some coin+',
usage: '+work',
cooldown: 600000,
run: async(client, message, args)  => {

    const userId = message.author.id
    const coins = Math.floor(Math.random() * (5000 - 1000) + 1000)

    const jobs = [
        `Administator`,
        `Fart Sniffer `,
        `Signal Manager`,
        `Gamer`,
        `Epic Gamer`,
        `Police`,
        `Programmer`,
        `YouTuber`,
        `Le Cook`,
        `Teacher`,
        `Kek Lover`,
        `Dealer of foriegn drugs...<a:pepeDark:815890336035242004>`,

    ]  
    const jobRamdomzier = Math.floor(Math.random()* jobs.length)
    
     await economy.addCoins(userId, coins)
    
    const embed = new Discord.MessageEmbed()
    .setDescription(`You work as a **${jobs[jobRamdomzier]}** and earn ${coins}`)
    .setColor(`#01A9CF`)

     message.channel.send(embed)
 }
} 