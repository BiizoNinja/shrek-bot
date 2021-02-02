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
        const targetid = target.id;

        const guildID = message.guild.id
        const userID = target.id;

        const coins = await economy.getCoins(guildID, userID);

        let embed = new Discord.MessageEmbed()
        .setTitle(`${target.tag}'s Balance!`)
        .setDescription(` ${target.username} has **${coins}** coins.`)
        .setFooter('pretty cool huh :flushed:')

        message.channel.send(embed)

    }
}