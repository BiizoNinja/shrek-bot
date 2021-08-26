const Discord = require('discord.js');
const axios = require('axios')

module.exports = {
  name: 'cat',
  description: 'Sends a cat image and a fact!',
  usage: 'cat',
  run: async (client, message, args) => {
    
   const url =  'https://no-api-key.com/api/v1/animals/cat'
   const result = await axios.get(url)

   const data =  result.data;

   const embed = new Discord.MessageEmbed()
     .setAuthor(`${message.author.tag} Requested a cat `, message.author.displayAvatarURL({dynamic:true}))
     .setDescription(`**Cat Fact:**\n> ${data.fact}`)
     .setImage(data.image)
     .setColor('#A6FE00')

   message.channel.send({embeds: [embed]})
  }
}
