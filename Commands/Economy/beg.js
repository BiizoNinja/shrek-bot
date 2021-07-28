const Discord = require('discord.js');
const economy = require('../../Other/economy')

module.exports = {
name: 'beg',
description: 'beg for some coins',
usage: 'beg',
cooldown: 1000 * 5 ,
run: async (client, message, args) => {

    const userId = message.author.id;
    const guildID = message.guild.id; 
    const coinsToGive = Math.floor(Math.random()* 300) + 100
    const begged = [
        `a damn rich monke threw **${coinsToGive}** 💸  at <@${userId}>!`,
        `an orangutan :orangutan: traded **${coinsToGive}** 💸  at <@${userId}>!`,
        `Thanos <:thanos_daddy:865438573015465996> gave **${coinsToGive}** 💸  to <@${userId}>!`,
        `an epic gamer was soo epic he gave **${coinsToGive}** 💸  to <@${userId}>!`,
        `the poop emoji :poop: gave **${coinsToGive}** 💸  to <@${userId}>!`,
        `pog manusha gave **${coinsToGive}** 💸 to <@${userId}>!`,
    
    ] 
    const index = Math.floor(Math.random()* begged.length)
    economy.addCoins(guildID, userId, coinsToGive)
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} Begged Coins`, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`${begged[index]}`)
    .setColor(message.member.displayHexColor)
    message.channel.send({embeds: [embed] })
}
}