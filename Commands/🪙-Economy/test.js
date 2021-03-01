const Discord = require('discord.js');
const economy = require('../../economy')

module.exports = {
name: 'test',
description: ' ',
usage: ' ',
cooldown: 0 ,
aliases: [' '],
run: async (client, message, args) => {

const userId = message.author.Discord
const coins = 100 

economy.addCoins(userId, coins)


}
}