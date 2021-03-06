const Discord = require('discord.js')
const economy = require('../../economy')

module.exports = {
    name: 'balance',
    description: 'Check user\'s balance',
    usage: '+balance [@user]',
    aliases: ['bal'],
    run: async(client, message, args)  => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id
        const userId = target.id
    
        const coins = await economy.getCoins(userId)
        const footers = [
            'pretty cool huh 😳',
            'what a scrub',
            'shrekbot.netlify.app',
            'hmmm rich or not?'
        ]
        const footerRandomiser = Math.floor(Math.random() *footers.length)


        const embed = new Discord.MessageEmbed()
        .setTitle(`${target.tag}'s Balance!`)
        .setDescription(`**Wallet**: ${coins} coins <:shrekCoin:815183499320492052> `)
        .setColor('RANDOM')
        .setFooter(`${footers[footerRandomiser]}`)

        message.channel.send(embed)
    }

}