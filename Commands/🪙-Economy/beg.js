const economy = require('../../economy')
const Discord = require('discord.js')
const ms = require('parse-ms')

module.exports = {
    name: 'beg',
    description: 'beg for coins <:flushed_squish:806402949235736627>',
    usage: 's!beg',
    aliases: [],
    execute: async(Client, message, args) => { 

    let guildID = message.guild.id;
    let userID = message.author.id
    let coins = Math.floor(Math.random()* (1001 - 30) + 30)

    const replies = [
      `**Papa Jim** Donated ${coins} coins to <@${userID}>!`,
      `**James Charles** Donated ${coins} coins to <@${userID}>!`,
      `**Selena Gomez** Donated ${coins} coins to <@${userID}>!`,
      `**Granny** Donated ${coins} coins to <@${userID}>!`,
      `**Shre the t** Donated ${coins} coins to <@${userID}>!`,
      `**THE GOD HIMSELF!** Donated ${coins} coins to <@${userID}>!`,
      `**Hackerboi 69** Donated ${coins} coins to <@${userID}>!`,
      `**FiredragonPlayz** Donated ${coins} to <@${userID}>!`,
      `**mallusrgreatv2** Donated ${coins} coins to <${userID}!`,
      `**Pewdiepie** Donated ${coins} coins to <@${userID}!`,
      `**Mr.Beast** Donated ${coins} coins to <@${userID}>!`,
      `**gamer123LOL** Donated ${coins} coins to <@${userID}>!`,
      `**The kekw guy** Donated ${coins} coins to <@${userID}>`
    ]
    const random = Math.floor((Math.random()* replies.length))

    const newCoins = await economy.addCoins(guildID, userID, coins); 
    message.channel.send(`${replies[random]}`);
    
 } 
}