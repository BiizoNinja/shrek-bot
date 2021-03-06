const Discord = require('discord.js')
module.exports = {
   name: 'bot-info',
   description: 'Get info about the bot.',
   aliases: ["botinfo", "bi", "support", "invite"],
   usage: '+aboutme',
   run: async(client, message, args) => {

    let uptime = ``;
    let totalseconds = (client.uptime / 1000)
    let hours = Math.floor(totalseconds / 3600)
    totalseconds %= 3600
    let minutes = Math.floor(totalseconds / 60)
    let seconds = Math.floor(totalseconds % 60)

    if (hours > 23) {
        days = days + 1
        hours = 0 

    }

    if(minutes > 60) {
        minutes = 0;
    }

    uptime += ` **${hours}** hours, **${minutes}** minutes and **${seconds}** seconds`

       let embed = new Discord.MessageEmbed()
       .setTitle('About ShrekBot!')
       .setDescription('Do \`+help\` do get a list of commands')
       .addFields(
           {name: 'Server Count', value: `${client.guilds.cache.size} Servers`, inline: true},
           {name: 'Language', value: `JavaScript ES6, Including Node.js for discord.js`, inline: true},
           {name: 'Bot Version', value: `2.1`, inline: true},
           {name: 'Commands', value: `${client.commands.size} Command+`, inline: true},
           {name: 'Add ShrekBot to your server', value: `[Click here](https://dsc.gg/shrekbot)`, inline: true},
           {name: 'Vote For ShrekBot', value: `[Click Here](https://top.gg/bot/789129116015525918)`, inline: true},
           {name: 'Support Server', value: `[Click Here](https://discord.gg/CgzBqZjz2v)`, inline: true},
           {name: 'Time Until Last Restarted', value: uptime, inline: true}
       )
       .setFooter(`pretty cool ain't it?`)
       .setColor('RANDOM')


       await message.channel.send(embed)
   }
}