const Discord = require('discord.js');
const items = require('../../economy/items')

module.exports = {
name: 'shop',
description: 'take a look at the shop!',
usage: 's!shop',
cooldown: 1000 ,
aliases: ['sh'],

run: async (client, message, args) => {
 if(!items.length) return message.channl.send('There are no itmes for sale yet.')

 const shopList = items.map((value, index) => {
     return `${value.emoji} **${value.item}** \n> ➤ **Price:** ${value.price} coins\n> ➤ **Item Type**: ${value.type}\n> ➤ **${value.description}**`
 })
 const embed = new Discord.MessageEmbed()
 .setTitle(`ShrekBot's Shop!`)
 .setDescription(shopList)
 .setColor(`RANDOM`)
 .setFooter(`Do s!buy <Item_Name> to buy the item!`);

 message.channel.send(embed)
}
}