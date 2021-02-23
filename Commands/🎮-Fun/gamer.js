const Discord = require('discord.js')

module.exports = {
    name: 'gamerrate',
    description: 'Look how epic gamer you are, NOTE: The _ in the usage says that <USER> may exist or not.',
    usage: 's!gamerrate _ <@USER> ',
    examples: 's!gamerrate @Biomeium **OR** s!gamerrate',
    aliases: ['gamer'],
    execute:async (client, message, args) => {

        const bots = message.guild.members.cache.filter(member => member.user.bot)

        let rate = (Math.floor(Math.random() * Math.floor(100)));S

        let user = message.mentions.users.first() || message.author || message.users.id
    
        
        const GamerEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${user.tag}'s Gamer r8`)
        .setDescription(`${user} is ${rate}% gamer`)
        .setTimestamp()
        .setFooter('nice')

        message.channel.send(GamerEmbed)
       S
      }

    }