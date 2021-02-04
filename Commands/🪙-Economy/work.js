const economy = require('../../economy')
const Discord = require('discord.js')

module.exports = {
    name: 'work',
    description: 'beg for coins <:flushed_squish:806402949235736627>',
    usage: 's!beg',
    timeout: 3600000,
    aliases: [],
    execute: async(Client, message, args) => { 
        const userID = message.author.id;
        const guildID = message.guild.id
        const coins = Math.floor(Math.random()* (3000 - 100) + 100)
        
        const jobs =[
            'Mr.Beast Burger Worker',
            'Nasa Rocket Scientist',
            'Discord mod',
            'Professional Fart Sniffer',
            'Network Admin',
            'Doctor',
            'Developer',
            'YouTuber',
            'Twitch Creator',
            'gamer',
            'epic gamer',
        ]
        const random = Math.floor((Math.random()* jobs.length))

        const newCoins = await economy.addCoins(guildID, userID, coins)

        let embed = new Discord.MessageEmbed()
        .setTitle(`\u200c`)
        .setDescription(`<a:TICK:801450801200758795> You work as a **${jobs[random]}** and earn **${newCoins}**. `)
        .setColor('#69b1fa')
        .setFooter('You can work every hour.')

        message.channel.send(embed)

    }
}