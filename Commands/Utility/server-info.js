module.exports = {
    name: 'server-info',
    aliases: ['si'],
    description: "This shows the server info",
    usage: "server-info",
    cooldown: 0,
    run: async (client, message, args) => {
        const Discord = require('discord.js');

        if(message.guild.region === 'brazil') message.guild.region = ':flag_br: **Brazil**'
        if(message.guild.region === 'europe') message.guild.region = ':flag_eu: **Europe**'
        if(message.guild.region === 'hongkong') message.guild.region = ':flag_hk: **Honk Kong**'
        if(message.guild.region === 'india') message.guild.region = ':flag_in: **India**'
        if(message.guild.region === 'japan') message.guild.region = ':flag_jp: **Japan**'
        if(message.guild.region === 'russia') message.guild.region = ':flag_ru: **Russia**'
        if(message.guild.region === 'singapore') message.guild.region = ':flag_sg: **Singapore**'
        if(message.guild.region === 'southafrica') message.guild.region = ':flag_za: **South Africa**'
        if(message.guild.region === 'sydney') message.guild.region = ':flag_hm: **Sydney**'
        if(message.guild.region === 'us-central') message.guild.region = ':flag_us: **US Central**'
        if(message.guild.region === 'us-east') message.guild.region = ':flag_us: **US East**'
        if(message.guild.region === 'us-west') message.guild.region = ':flag_us: **US West**'
        if(message.guild.region === 'us-south') message.guild.region = ':flag_us: **US South**'

        var EMBED = new Discord.MessageEmbed()
        .setTitle("Server-Info!")
        .setDescription('Some simple server info!')
        .addFields( 
            {name: `Server name 🎗️`, value: `${message.guild.name}`, inline: true },
            {name: `Server id 🆔`, value: `${message.guild.id}`, inline: true },
            {name: `Members 👥`, value: `${message.guild.memberCount}`, inline: true },
            {name: `Server roles 🔐`, value: `**${message.guild.roles.cache.size}** Role+`, inline:true},
            {name: `Channels 💬 `, value: `**${message.guild.channels.cache.filter(r => r.type === "text").size}** Text Channel+
            **${message.guild.channels.cache.filter(r => r.type === "voice").size}** Voice Channels`, inline: true },
            {name: `Server region 🌍`, value: `${message.guild.region}`, inline: true },
            {name: `Verification Level 📑`, value: `${message.guild.verificationLevel}`, inline: true },
            {name: `Created at 📆`, value: `${message.guild.createdAt.toLocaleString()}`, inline: true },
            {name: `Boosts <a:boost_animated:807845397396586526>`, value: `${message.guild.premiumSubscriptionCount}`, inline: true },

        )
        .setThumbnail(message.guild.iconURL({ dynamic: true , format: 'png'}))
        .setColor('RANDOM');

        message.channel.send(EMBED)
        
      }
    
    }

