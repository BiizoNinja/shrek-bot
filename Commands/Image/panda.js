const Discord = require('discord.js');
const axios = require('axios')

module.exports = {
  name: 'panda',
  description: 'Sends a panda image and a fact!',
  usage: 'panda',
  run: async (client, message, args) => {

    const url = 'https://no-api-key.com/api/v1/animals/panda'
    const result = await axios.get(url)

    const data = result.data;

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag} Requested a panda `, message.author.displayAvatarURL({dynamic:true}))
      .setDescription(`**Panda Fact:**\n> ${data.fact}`)
      .setImage(data.image)
      .setColor('#A6FE00')

    message.channel.send({embeds: [embed]})
  }
}
