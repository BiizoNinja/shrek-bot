const Discord = require('discord.js');

module.exports = {
name: 'invite',
description: 'Get the invite links of the bot',
usage: 'invite',
cooldown: 0,
run: async (client, message, args) => {

const embed = new Discord.MessageEmbed()
.setAuthor('Invite - ShrekBot', client.user.displayAvatarURL({dynamic: false}))
.setDescription(`Join Support Server: [Click me](https://discord.gg/V9DHGNtuUe)\nInvite Me: [Click me](https://dsc.gg/shrekbot)`)
.setColor(message.guild.me.displayHexColor)

message.channel.send(embed)
}
}