const Discord = require('discord.js');
const axios = require('axios')

module.exports = {
name: 'dog',
description: 'Sends a dog image and a fact!',
usage: 'dog',
run: async (client, message, args) => {

 const url =  'https://no-api-key.com/api/v1/animals/dog'   
 const result = await axios.get(url)

 const data =  result.data; 

 const embed = new Discord.MessageEmbed()
 .setAuthor(`${message.author.tag} Requested a dog `, message.author.displayAvatarURL({dynamic:true}))
 .setDescription(`**Dog Fact:**\n> ${data.fact}`)
 .setImage(data.image)
 .setColor('#A6FE00')

message.channel.send({embeds: [embed]})
}
}