const Discord = require('discord.js')
module.exports = {
    name: 'stats',
    description: 'Look at how many guilds the bot is in',
    aliases: ["stats"],
    usage: '+usage',
    run: async(client, message, args) => {

        let usageEmbed = new Discord.MessageEmbed()
        .setTitle('Usage')
        .setDescription(`Look at how many guilds our bot is on... Pretty epic. [Click Here](https://dsc.gg/shrekbot) to invite the bot!`)
        .addFields(
            {name: 'GUILDS (servers)', value: `\`${client.guilds.cache.size}\``},
            {name: 'USERS', value: `\`${client.users.cache.size}\``},
            {name: 'CHANNELS', value: `\`${client.channels.cache.size}\``},
        )
        .setColor(" #36393f ")
        message.channel.send(usageEmbed)
    
  }
}