module.exports = {
   name: 'ping',
   description: "Gets the bot ping",
   usage: 's!ping',
   aliases: ['beep'],
   execute: async (Client, message, args) => {
       const Discord = require('discord.js');


       message.channel.send('<a:red_loading:803500709713543178>').then(pingMessage => {

           const start = message.createdTimestamp;
           const end = pingMessage.createdTimestamp;
           const subtraction = end - start;

           let pingembed = new Discord.MessageEmbed()
               .setColor('#FF0000')
               .setTitle(`🏓**Pong!**`)
               .setDescription(`Bot Latency: \`${subtraction}ms.\`\n API Latency: \`${Math.round(message.Client.ws.ping)}ms\``)
               .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({dyanamic: true}));

           pingMessage.delete()
           message.channel.send(pingembed)
       })

   }
}


