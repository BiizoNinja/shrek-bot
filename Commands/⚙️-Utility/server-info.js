module.exports = {
    name: 'server-info',
    aliases: ['si'],
    description: "This shows the server info",
    usage: "s!server-info",
    execute: async (Client, message, args) => {
        const Discord = require('discord.js');

        var EMBED = new Discord.MessageEmbed()
        .setTitle("server info")
        .addField("server name 🎗️", `${message.guild.name}`)
        .addField("server id 🆔", `${message.guild.id}`)
        .addField("server owner 👑", `${message.guild.owner}`)
        .addField("members 👥", `${message.guild.memberCount}`)
        .addField("Server roles 🔐", `${message.guild.roles.cache.size}`)
    .addField(" channels 💬", `  ${message.guild.channels.cache.filter(r => r.type === "text").size} Text
          ${message.guild.channels.cache.filter(r => r.type === "voice").size} Voice`)
        .addField("server region 🌍", `${message.guild.region}`)  
        .addField("Verification Level 📑", `${message.guild.verificationLevel}`)
    .addField("created in 📆 ", `${message.guild.createdAt.toLocaleString()}`)
    .addField("Boosts ✨", `${message.guild.premiumSubscriptionCount}`)
    .setColor("RANDOM")
    .setFooter(`Requsted by ${message.author.username}`, message.member.displayAvatarURL( {dynamic: true}))
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
        message.channel.send(EMBED)
      }
    
    }

