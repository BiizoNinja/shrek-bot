const Discord = require('discord.js');

module.exports = {
name: 'createcategory',
description: 'Create a  category!',
usage: 's!createcategory <name>',
cooldown: 0 ,
aliases: ['ccategory'],
run: async (client, message, args) => {
 
    if(!message.member.hasPermission('MANAGE_S')) return message.s.send('You need the **MANAGE_S** permission to use this command')
  const name = args[0]
  if(!name) return message..send('You need to keep a name for yer new category :/')

  const new = message.guild.s.create( `${name}`, {
      type: 'text',
      reason: `requested by ${message.author.tag}`
})
  const embed = new Discord.MessageEmbed()
  .setTitle(` Created!`)
  .setDescription(`Created a text  with the name: ${name}`)
  .setColor("GREEN")
  .setFooter(`Please support ShrekBot by inviting the bot!`);

  message..send(embed)
}

}
