const Discord = require('discord.js')
module.exports = {
    name: 'usage',
    description: 'Look at how many guilds the bot is in',
    aliases: ["usg"],
    usage: 's!usage',
    run: async(Client, message, args) => {

        let usageEmbed = new Discord.MessageEmbed()
        .setTitle('Usage')
        .setDescription(`Look at how many guilds our bot is on... Pretty epic. [Click Here](https://dsc.gg/shrebot) to invite the bot!`)
        .addFields(
            {name: 'GUILDS (servers)', value: `\`${Client.guilds.cache.size}\``},
            {name: 'USERS', value: `\`${Client.users.cache.size}\``},
            {name: 'CHANNELS', value: `\`${Client.channels.cache.size}\``},
        )
        message.channel.send(usageEmbed)

    
  }
}