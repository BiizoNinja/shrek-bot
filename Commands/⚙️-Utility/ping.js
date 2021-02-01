module.exports = {
   name: 'ping',
   description: "Gets the bot ping",
   usage: 's!ping',
   aliases: ['beep'],
   run: async (client, message, args) => {
       const Discord = require('discord.js');


       message.channel.send('<a:loading:798947890257068093>').then(pingMessage => {

           const start = message.createdTimestamp;
           const end = pingMessage.createdTimestamp;
           const subtraction = end - start;

           let pingembed = new Discord.MessageEmbed()
               .setColor('#FF0000')
               .setTitle(`🏓**Pong!**`)
               .setDescription(`Bot Latency: \`${subtraction}ms.\`\n API Latency: \`${Math.round(message.client.ws.ping)}ms\``)
               .setFooter('Is it okay? I can\'t look!')

           pingMessage.delete()
           message.channel.send(pingembed)
       })

   }
}


