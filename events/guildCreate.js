const client = require('../index');

client.on('guildCreate', (guild) => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));

    if (!channel) return;
    console.log(`I got added to ${guild.name}`)
    const Discord = require('discord.js');
       const embed = new  Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .setTitle('Thank You!')
            .setDescription(`Thank you for inviting me! My prefix is \`+\`\n You can do \`+help\` for a list of commad+ \n I'll do my best to help! \n If you need help check the [Support Server](https://discord.gg/CgzBqZjz2v) `)
            .setColor("GREEN")
            .setTimestamp()
        channel.send(embed)
        
})