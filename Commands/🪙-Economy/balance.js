const economy = require('../../economy')
const Discord = require('discord.js')

module.exports = {
    name: 'balance',
    description: 'Check your balance!',
    usage: 's!bal [@user]',
    examples: 's!bal || s!bal @BiizoNinja',
    aliases: ["bal", "coins"],
    execute: async(Client, message, args) => { 

        const target = message.mentions.users.first() || message.author;

        const userID = target.id;

        const coins = await economy.getCoins(userID)

        let embed = new Discord.MessageEmbed()
        .setTitle(`${target.tag}'s Balance!`)
        .setDescription(` ${target.username} has **${coins}** <:Shrek_Coin:807140320507854878>.`)
        .setFooter('pretty cool huh 😳 ')
        .setColor('RANDOM')

        message.channel.send(embed)

    }
}