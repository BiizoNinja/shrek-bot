const Discord = require('discord.js');
const suggestionSchema = require('../../models/sugSettings-schema')

module.exports = {
name: ' ',
description: 'View the server\'s suggestion settings',
usage: 'suggestion [Setting] [Value]',
aliases: ['sug-set', 'sug-s'],
run: async (client, message, args) => {

if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('<:wrong:856162786319925270> You need the \`ADMINISTRATOR\` permission to use this!')

const setting = args[0] 
const sugSet = await suggestionSchema.findOne({
  GuildID: message.guild.id
})

if(!setting) {

  if(!sugSet) {
    await new suggestionSchema({
      GuildID: message.guild.id,
      SuggestionChannel: 'None',
      ManagerRole: 'None'
    }).save();
    
    const noneEmbed = new Discord.MessageEmbed()
    .setAuthor(`Suggestion Settings for ${message.guild.name}`, message.guild.iconURL({dynamic:true}))
    .setDescription(`To change the settings run \`.suggestion <Setting> <Value>\``)
    .addFields(
      {name: 'Suggestion Channel', value: `<:wrong:856162786319925270> - None`},
      {name: 'Manager Role', value: `<:wrong:856162786319925270> - None`}
    )
    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
    message.channel.send(noneEmbed)
  }; 
  if(sugSet.SuggestionChannel == 'None' && sugSet.ManagerRole == 'None') {
    const noneEmbed1 = new Discord.MessageEmbed()
    .setAuthor(`Suggestion Settings for ${message.guild.name}`, message.guild.iconURL({dynamic:true}))
    .setDescription(`To change the settings run \`.suggestion <Setting> <Value>\``)
    .addFields(
      {name: 'Suggestion Channel', value: `<:wrong:856162786319925270> - None`},
      {name: 'Manager Role', value: `<:wrong:856162786319925270> - None`}
    )
    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
    message.channel.send(noneEmbed1)
  }

  if(sugSet.SuggestionChannel == 'None') {
    const sugChannelEmbed = new Discord.MessageEmbed()
    .setAuthor(`Suggestion Settings for ${message.guild.name}`, message.guild.iconURL({dynamic:true}))
    .setDescription(`To change the settings run \`.suggestion <Setting> <Value>\``)
    .addFields(
      {name: 'Suggestion Channel', value: '<:wrong:856162786319925270> - None'},
      {name: 'Manager Role', value: `<@&${sugSet.ManagerRole}>`}
    )
    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
    message.channel.send(sugChannelEmbed)
  }; 

  if(sugSet.ManagerRole == 'None') {
      const sugRoleEmbed = new Discord.MessageEmbed()
      .setAuthor(`Suggestion Settings for ${message.guild.name}`, message.guild.iconURL({dynamic:true}))
      .setDescription(`To change the settings run \`.suggestion <Setting> <Value>\``)
      .addFields(
        {name: 'Suggestion Channel', value:`<#${sugSet.SuggestionChannel}>`},
        {name: 'Manager Role', value: '<:wrong:856162786319925270> - None'}
      )
      .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
      message.channel.send(sugRoleEmbed)
  } else {
    const sugFullEmbed = new Discord.MessageEmbed()
      .setAuthor(`Suggestion Settings for ${message.guild.name}`, message.guild.iconURL({dynamic:true}))
      .setDescription(`To change the settings run \`.suggestion <Setting> <Value>\``)
      .addFields(
        {name: 'Suggestion Channel', value:`<#${sugSet.SuggestionChannel}>`},
        {name: 'Manager Role', value: `<@&${sugSet.ManagerRole}>`}
      )
      .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
      message.channel.send(sugFullEmbed)
  }

}; 

if(setting == 'Channel' || setting == 'SuggestionChannel') {
  const channel = message.mentions.channels.last() | message.guild.channels.cache.get(args[1])
  if(!channel) return message.channel.send('<:wrong:856162786319925270> Please provide a channel')

  if(!sugSet) { 
    await new suggestionSchema({
      GuildID: message.guild.id,
      SuggestionChannel: channel.id,
      ManagerRole: 'None'
    }).save();
  message.channel.send(`<:greenTick:854228019312066571> Succesfully saved the Suggestion Channel for ${channel}`)
 } else {
   await suggestionSchema.findOneAndUpdate(
     {
       GuildID: message.guild.id
     },
     {
      GuildID: message.guild.id,
      SuggestionChannel: channel.id,
     }
   ); 
  message.channel.send(`<:greenTick:854228019312066571> Succesfully saved the Suggestion Channel for ${channel}`)

 }; 



}
}
}
