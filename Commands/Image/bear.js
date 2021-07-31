const Discord = require('discord.js');
const axios = require('axios')

module.exports = {
name: 'bear',
description: 'Sends a bear image and a fact!',
usage: 'bear',
run: async (client, message, args) => {

 const url =  'https://no-api-key.com/api/v1/animals/bear'   
 const result = await axios.get(url)

 const data =  result.data; 

 const embed = new Discord.MessageEmbed()
 .setAuthor(`${message.author.tag} Requested a bear `, message.author.displayAvatarURL({dynamic:true}))
 .setDescription(`**Bear Fact:**\n> ${data.fact}`)
 .setImage(data.image)
 .setColor('#A6FE00')

message.channel.send(embed)
}
}