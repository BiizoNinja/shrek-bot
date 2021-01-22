module.exports = {
    name: 'server-info',
    aliases: ['si'],
    description: "This shows the server info",
    usage: "s!server-info",
    execute: async (Client, message, args) => {
        const Discord = require('discord.js');

        const botSize = message.guild.members.cache.filter(m => m.user.bot).size

        const { name, owner, roles, channels, createdAt, premiumSubscriptionCount, memberCount, region } = message.guild
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(name)
                .setDescription(`Some simple server information.`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .addField('Owner', owner, true)
                .addField('Boosters', premiumSubscriptionCount, true)
                .addField('Region', region.toUpperCase(), true)
                .addField('Total Members', memberCount, true)
                .addField('Total Bots', botSize, true) 
                .addField('Roles', roles.cache.size, true)
                .setFooter(`Server Created on`)
                .setColor('#FF0000')
                .setTimestamp(createdAt)
        )
            .catch((e) => message.channel.send(`error: ${e.message}`))
    }
}
