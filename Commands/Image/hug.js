const Discord = require('discord.js');
const axios = require('axios')

module.exports = {
name: 'hug',
description: 'Hug someone 🤗',
usage: 'hug <User>',
run: async (client, message, args) => {

const member = message.mentions.members.first()
if(!member) return message.channel.send('<:wrong:856162786319925270> Please specify a member to play with!')
if(member.id == message.author.id) return message.channel.send('<:wrong:856162786319925270> You can\'t play with yourself!')
if(member.bot) return message.channel.send('<:wrong:856162786319925270> You can\'t play with bots.')

const url = 'https://no-api-key.com/api/v1/hug'
const result = await axios.get(url)

const data =  result.data; 

const embed = new Discord.MessageEmbed()
.setDescription(`Awww.. <@${message.author.id}> hugged <@${member.id}> So cute! <3`)
.setImage(data.image)
.setColor('#A6FE00')

message.channel.send({embeds: [embed]})


}
}