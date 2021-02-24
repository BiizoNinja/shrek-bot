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
            `**Mr.Beast** donated ${coinsToAdd} to <@${message.author.id}>!`,
            `**Luke Skywalker** donated ${coinsToAdd} to <@${message.author.id}>!`,
            `A monkey threw ${coinsToAdd} on <@${message.author.id}> damn rich monke`,
            `Skedle donated his organs and gave ${coinsToAdd} to <@${message.author.tag}>`,
            `you're mom gave ${coinsToAdd} to you...`,
            `ShrekBot pitied and gave a measly ${coinsToAdd} to <@${message.author.id}>`,
            `**mallusrgreatv2** donated ${coinsToAdd} to <@${message.author.id}>!`,
            `**Hackerboi 69** donated ${coinsToAdd} to <@${message.author.id}>!`,
            `**FiredragonPlayz** donated ${coinsToAdd} to <@${message.author.id}>!`,
            `SoulSeeker gave you ${coinsToAdd} because he's cool.`,
            `Flame Bot gave you ${coinsToAdd} `
        ]
        const randomDonation = Math.floor(Math.random()* donations.length)
        client.add(message.member.id, parseInt(coinsToAdd))

        message.channel.send(`${donations[randomDonation]}`)
    }
}