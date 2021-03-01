const Discord = require('discord.js');

module.exports = {
name: 'createvoice',
description: 'Create a voice channel!',
usage: 's!createvoice <name>',
cooldown: 0 ,
aliases: ['cvoice'],
run: async (client, message, args) => {
 
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channels.send('You need the **MANAGE_CHANNELS** permission to use this command')
  const name = args[0]
  if(!name) return message.channel.send('You need to keep a name for yer new channel :/')

  const newChannel = message.guild.channels.create( `${name}`, {
      type: 'voice',
      reason: `requested by ${message.author.tag}`
})
  const embed = new Discord.MessageEmbed()
  .setTitle(`Channel Created!`)
  .setDescription(`Created a voice channel with the name: ${name}`)
  .setColor("GREEN")
  .setFooter(`Please support ShrekBot by inviting the bot!`);

  message.channel.send(embed)
}

}
