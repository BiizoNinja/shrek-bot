const Discord = require('discord.js');

module.exports = {
name: 'createcategory',
description: 'Create a  category!',
usage: 'createcategory <name>',
cooldown: 0 ,
aliases: ['ccategory'],
run: async (client, message, args) => {
 
    if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.s.send('You need the **MANAGE_CHANNELS** permission to use this command')
  const name = args[0]
  if(!name) return message.channel.send('You need to keep a name for yer new category :/')

  const newCate = message.guild.channels.create( `${name}`, {
      type: 'category',
      reason: `requested by ${message.author.tag}`
})
  const embed = new Discord.MessageEmbed()
  .setTitle(`Category Created!`)
  .setDescription(`Created a category with the name: ${name}`)
  .setColor("GREEN")
  .setFooter(`Please support ShrekBot by inviting the bot!`);

  message.channel.send(embed)
}


}
