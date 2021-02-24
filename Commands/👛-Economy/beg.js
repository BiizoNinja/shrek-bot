const Discord = require('discord.js')
const client = require('../..')
const { Timeout } = require('./balance')

module.exports = {
    name: 'beg',
    descrption: 'beg for coins...',
    usage: 's!beg',
    cooldown: 45000,
    run: async(client, message, args) => {

        const coinsToAdd = Math.floor(Math.random() * (851 - 50) + 50)
        const donations = [
            `**Mr.Beast** donated ${coinsToAdd} coins to <@${message.author.id}>!`,
            `**Luke Skywalker** donated ${coinsToAdd} coins to <@${message.author.id}>!`,
            `A monkey threw ${coinsToAdd} coins on <@${message.author.id}> damn rich monke`,
            `Skedle donated his organs and gave ${coinsToAdd} coins to <@${message.author.id}>`,
            `you're mom gave ${coinsToAdd} coins to you...`,
            `ShrekBot pitied and gave a measly ${coinsToAdd} coins to <@${message.author.id}>`,
            `**mallusrgreatv2** donated ${coinsToAdd} coins to <@${message.author.id}>!`,
            `**Hackerboi 69** donated ${coinsToAdd} coins to <@${message.author.id}>!`,
            `**FiredragonPlayz** donated ${coinsToAdd} coins to <@${message.author.id}>!`,
            `SoulSeeker gave you ${coinsToAdd} coins because he's cool.`,
            `Flame Bot gave you ${coinsToAdd} coins `
        ]
        const randomDonation = Math.floor(Math.random()* donations.length)
        client.add(message.member.id, coinsToAdd)

        message.channel.send(`${donations[randomDonation]}`)
    }
}