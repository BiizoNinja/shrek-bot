const Discord = require('discord.js');
const items = require('../../economy/items')
const economy = require('../../economy')
const inventory = require('../../models/inventoryDataSchema')

module.exports = {
name: 'inventory',
description: 'Check you\'re inventory!',
usage: 's!inventory',
cooldown: 0 ,
aliases: [''],
run: async (client, message, args) => {

 inventory.findOne({ userId: message.author.id}), async(err, data) => {
     if(!data) return message.channel.send('You\'re inventoey is empty! to buy thing so `s!shop`')
     const mappedData = Object.keys(data.inventory)
     .map((key) => {
        return `> **${key}**/n> ➤ ${data.inventory[key]}`
     })
     .join(`\n`)

     const embed = new Discord.MessageEmbed()
     .setTitle(`${message.author.username}'s inventory`)
     .setDescription(mappedData)
     .setTimestamp()
     .setColor(`RANOM`)
     
    message.channels.send(embed)
 } 

}
}