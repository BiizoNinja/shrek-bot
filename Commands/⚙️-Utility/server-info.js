module.exports = {
    name: 'server-info',
    aliases: ['si'],
    description: "This shows the server info",
    usage: "s!server-info",
    execute: async (Client, message, args) => {
        const Discord = require('discord.js');

        var EMBED = new Discord.MessageEmbed()
        .setTitle("server info")
        .addFields( 
            {name: `Server name 🎗️`, value: `${message.guild.name}`, inline: true },
            {name: `Server id 🆔`, value: `${message.guild.id}`, inline: true },
            {name: `Server owner 👑`, value: `${message.guild.owner}`, inline: true },
            {name: `Members 👥`, value: `${message.guild.memberCount}`, inline: true },
            {name: `Server roles 🔐`, value: `${message.guild.channels.cache.filter(r => r.type === "text").size} Text
            ${message.guild.channels.cache.filter(r => r.type === "voice").size} Voice`, inline: true },
            {name: `Channels 💬 `, value: `${message.guild.owner}`, inline: true },
            {name: `Server region 🌍`, value: `${message.guild.region}`, inline: true },
            {name: `Verification Level 📑`, value: `${message.guild.verificationLevel}`, inline: true },
            {name: `Created in 📆`, value: `${message.guild.createdAt.toLocaleString()}`, inline: true },
            {name: `Boosts ✨`, value: `${message.guild.premiumSubscriptionCount}`, inline: true },

        )
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor('RANDOM');

        message.channel.send(EMBED)
      }
    
    }

