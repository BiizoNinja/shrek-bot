const client = require('../index');

client.on('guildCreate', (guild) => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));

    if (!channel) return;
    const Discord = require('discord.js');
       const embed = new  Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .setTitle('Thank You!')
            .setDescription(`Thank you! **${guild.name}**! For inviting me!! I am ShrekBot and __open source__ discord bot, I am developed by \`BiizoNinja#6969\` and all the amazing people who fork my github repo :)\nAnd they updates me all the time! I will do my very best to help out in the server.\n**Important Links**:\nSupport Server: [Click me!](https://discord.gg/V9DHGNtuUe)\nMy invite link: [Click me](https://dsc.gg/shrekbot)\nGitHub: [Click me](https://github.com/BiizoNinja/shrek-bot)`)
            .setColor("RANDOM")
            .setFooter('For support join the support server!')
            .setTimestamp()
        channel.send(embed)
        
})