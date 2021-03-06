const Discord = require('discord.js');
const items = require('../../economy/items')
const invData = require('../../models/inventoryDataSchema')
const economy = require('../../money')

module.exports = {
name: 'buy',
description: 'buy things from the shop!',
usage: '+buy <item-name>',
cooldown: 0 ,
aliases: [' '],
run: async (client, message, args) => {

const userId = message.author.id
const itemName = args.join(' ').toLowerCase()
  if(!itemName) return message.channel.send(`oh yeah let's buy air shall we?... please provide an item to buy <:LONG_NOSE:810455970038677504>`)

 const validItem =  !!items.find((val) => val.item.toLowerCase() === itemName)
 if(!validItem) return message.channel.send(`what are you thinking... there is NO item called "${itemName}" in the shop! Please do \`+shop\` to take a look at the items`)

 const itemPrice = items.find((val) => val.item.toLowerCase() === itemName).price
 const userBalance = await economy.getCoins(userId)

if(userBalance < itemPrice ) return message.channel.send(`bro, you can't afford that... you have only ${userBalance} coins in your wallet. `)


invData.findOne(userId, async(err, data) => {
    if(data) {
        const hasItem = Object.keys(data.inventory).includes(itemName)
        if(!hasItem) {
            data.inventory[itemName] = 1
        } else {
            data.inventory[itemName]++
        }
        await invData.findOneAndUpdate(userId, data)
    } else {
        new invData({
            userId: message.author.id,
            inventory: {
                [itemName]: +1
            },
        }).save();
    }
    economy.rmvCoins(userId, itemPrice)
    message.channel.send(`<@${userId}> You bought ${itemName} and paid \`${itemPrice}\` coin+`)
})
}
}