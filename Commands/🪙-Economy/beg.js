const economy = require('../../economy')
const Discord = require('discord.js')
const ms = require('parse-ms')

module.exports = {
    name: 'beg',
    description: 'beg for coins <:flushed_squish:806402949235736627>',
    usage: 's!beg',
    timeout: 45000,
    aliases: [],
    execute: async(Client, message, args) => { 

    let userId = message.author.id
    let coins = Math.floor(Math.random()* (1001 - 30) + 30)

    const replies = [
      `**Papa Jim** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**James Charles** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**Selena Gomez** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**Granny** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**Shre the t** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**THE GOD HIMSELF!** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**Hackerboi 69** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**FiredragonPlayz** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**mallusrgreatv2** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**Pewdiepie** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**Mr.Beast** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**gamer123LOL** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>!`,
      `**The kekw guy** Donated ${coins} <:Shrek_Coin:807140320507854878> to <@${userID}>`
    ]
    const random = Math.floor((Math.random()* replies.length))

    await economy.addCoins(userId, coins)
    message.channel.send(`${replies[random]}`);
    
 } 
}