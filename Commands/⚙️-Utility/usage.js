const Discord = require('discord.js')
module.exports = {
    name: 'usage',
    description: 'Look at how many guilds the bot is in',
    aliases: ["usg"],
    usage: 's!usage',
    execute: async(Client, message, args) => {

        let usageEmbed = new Discord.MessageEmbed()
        .setTitle('Usage')
        .setDescription(`Look at how many guilds our bot is on... Pretty epic. [Click Here](https://dsc.gg/shrekbot) to invite the bot!`)
        .addFields(
            {name: 'GUILDS (servers)', value: `\`${Client.guilds.cache.size}\``},
            {name: 'USERS', value: `\`${Client.users.cache.size}\``},
            {name: 'CHANNELS', value: `\`${Client.channels.cache.size}\``},
        )
        .setColor(" #36393f ")
        message.channel.send(usageEmbed)

    
  }
}