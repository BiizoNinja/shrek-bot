const Discord = require('discord.js');

module.exports = {
name: 'createchannel',
description: 'Create a text channel!',
usage: 's!create channel <name>',
cooldown: 0 ,
aliases: ['cchannel'],
run: async (client, message, args) => {
 
    if(!message.author.hasPermission('MANAGE_CHANNELS')) return message.channels.send('You need the **MANAGE_CHANNELS** permission to use thic command')
  const name = args[0]
  if(!name) return message.channel.send('You need to keep a name for yer new channel :/')

  const newChannel = message.guild.channels.create({
      name: `${name}`,
      type: 'text',
      reason: `requested by ${message.autor.tag}`
  })
  const embed = new Discord.MessageEmbed()
  .setTitle(`Channel Created!`)
  .setDescription(`Created <#${newChannel.id}> with the name: ${name}`)
  .setColor("GREEN")
  .setFooter(`Please support ShrekBot by inviting the bot!`);
}
}
