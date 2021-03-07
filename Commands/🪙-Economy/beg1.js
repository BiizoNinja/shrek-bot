const Discord = require('discord.js')
const economy = require('../../money')

module.exports = {
name: 'beg',
description: 'Beg for some coins!',
usage: '+beg',
cooldown: 45000,
run: async(client, message, args)  => {

    const userId = message.author.id
    const coins = Math.floor(Math.random() * (950 - 50) + 50)

    const beg = [
        `**Mr.Beast** donated ${coins} coins <:shrekCoin:815183499320492052> to <@${message.author.id}>! `,
        `**mallusrgreat** donated ${coins} coins <:shrekCoin:815183499320492052> to <@${message.author.id}>! `,
        `**FiredragonPlayz** donated ${coins} coins <:shrekCoin:815183499320492052> to <@${message.author.id}>! `,
        `**Hackerboi 69** donated ${coins} coins <:shrekCoin:815183499320492052> to <@${message.author.id}>! `,
        `a damn rich monke :monkey: threw ${coins} coins <:shrekCoin:815183499320492052> at <@${message.author.id}>! `,
        `skedle donated his organs and gave ${coins} coins <:shrekCoin:815183499320492052> to <@${message.author.id}>! `,
        `**Biomeium** donated ${coins} coins <:shrekCoin:815183499320492052> to <@${message.author.id}>! `,
        `you're worst enemy PITIED you, and donated ${coins} coins <:shrekCoin:815183499320492052> to <@${message.author.id}>! (you lost the battle man...) `,
        `**The Poop emoji :poop:** donated ${coins} coins <:shrekCoin:815183499320492052> to <@${message.author.id}>! `,
        `**Pewdiepie** donated ${coins} coins <:shrekCoin:815183499320492052> to <@${message.author.id}>! `,
        `rubix did much BASS and <a:RUBIX_BASS:810698436311121921> donated ${coins} coins <:shrekCoin:815183499320492052> to <@${message.author.id}>! `,
        `**james charles** gave ${coins} coins <:shrekCoin:815183499320492052> to <@${message.author.id}>! `,
        `ur mom gave you ${coins} coins <:shrekCoin:815183499320492052> to buy a text-book!`
    ]  
    const begRamdomzier = Math.floor(Math.random()* beg.length)
    
    message.channel.send(`${beg[begRamdomzier]}`)
    economy.addCoins(userId, coins)
 }
} 