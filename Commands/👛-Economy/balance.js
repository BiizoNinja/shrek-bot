const Discord = require('discord.js')
const ms = require('ms')
const { user } = require('../..')
module.exports = {
    name: 'balance',
    description: 'Check you\'re balance',
    usage: 's!balance',
    Timeout: 0,
    aliases: ["bal"],
    run: async(client, message, args) => {
        const userBal = await client.bal(message.member.id)

        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${message.author.tag}'s balance`)
        .setDescription(`**Wallet:** `   +    userBal )
        .setFooter('pretty cool huh 😳')
       message.channel.send(embed)
    }
}