const Discord = require('discord.js');
const schema = require('../../models/boostMessage')

module.exports = {
name: 'boost',
description: 'Check the settings / tweak settings for boost notifiers!',
usage: 'boost <settings | cache | help>',
run: async (client, message, args) => {

const mode = args[0]
const guildID = message.guild.id
const messageChannel = message.channel
const boostData = await schema.findOne({
    GuildID: message.guild.id
});

if(!mode) return message.channel.send('<:wrong:856162786319925270> Please mention a mode `.boost <settings | cache | help>`')

if(mode.toLowerCase() == `cache`) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`<:wrong:856162786319925270>  You need the \`ADMINISTRATOR\ permission to use this!`)
   if(boostData) return message.channel.send('<:wrong:856162786319925270> This server is already cached! Run `.boost settings` to view settings')
   if(!boostData)  {
      const msg = await message.channel.send('<a:blueLoading:856159438024605709> Adding server to the database (this should take a moment)')
      await new schema({
          GuildID: message.guild.id,
          BoostChannel: 'None',
          BoostMessage: 'None'
      }).save()
     setTimeout(() => {
         msg.edit('<:greenTick:854228019312066571> Successfully added this server to the database!\n> You can change add a boost channel by doing `.boost settings Channel <#Channel>` ')
     }, 5000);
   };
};

if(mode.toLowerCase() == 'settings') { 
 if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`<:wrong:856162786319925270>  You need the \`ADMINISTRATOR\ permission to use this!`)
 if(!boostData) return message.channel.send('<:wrong:856162786319925270> This server isn\'t added to the database! Please run `.boost cache` to add it!')

 const settings = args[1]
 
 if(!settings) {
     const settingEmbed = new Discord.MessageEmbed()
     .setAuthor(`${message.guild.name} - Settings - Boost Messages`, message.guild.iconURL({dynamic: true}))
     .setDescription('You can change the settings by `.boost settings <Setting> <Value>`')
     .addFields(
         {
            name: '» Boost Message',
            value: `${boostData.BoostMessage}`
         },
         {
            name: '» Boost Channel',
            value: `${boostData.BoostChannel}`
         }
     )
     .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
     .setColor(message.guild.me.displayHexColor)
    message.channel.send(settingEmbed)
 }; 

 if(settings == 'Message') {
     const message = args.slice(2).join(' ')
     if(!message) return message.channel.send('<:wrong:856162786319925270> Provide a message!')
     await schema.findOneAndUpdate(
         {
             GuildID: guildID
         },
         {
             BoostMessage: message
         }
     ); 
     messageChannel.send(`<:greenTick:854228019312066571> Successfully added the boost message as\n\`\`\`md\n${message}\`\`\``)
 }; 

 if(settings == 'Channel') {
    const channel = message.mentions.channels.last()
    if(!channel) return message.channel.send('<:wrong:856162786319925270> Provide a channel!')
    await schema.findOneAndUpdate(
        {
            GuildID: message.guild.id
        },
        {
            BoostChannel: channel
        }
    ); 
    message.channel.send(`<:greenTick:854228019312066571> Successfully added the boost channel to ${channel}`)
 }; 
};

if(mode.toLowerCase() == 'help') {
    
    const {ReactionPages} = require('reconlx')

    const helpEmbed1 = new Discord.MessageEmbed()
    .setAuthor(`Help - Boost Detectors`, client.user.displayAvatarURL({dynamic: true}))
    .setDescription('Here you can get help on how to use the boost system.')
    .addFields(
        {
            name: "Caching",
            value: 'Before you can use any of the `Boost Message` commands you need to cache your server! (add your server to our database) Administrators can do this by running `.boost cache`.'
        },
        {
            name: "Settings",
            value: "The Boost setting menu is very simple! There are 2 things\n `#1)` **Boost Message**\n> Boost messages are the messages that are sent when someone boosts the server. Head over to the next page to see variables that you can use. Command: `.boost settings Message <message>`\n`#2)` **Boost Channel**\n> The channel which the boost message will be sent to! Command: `.boost settings Channel <channel>`"

        }
    )
    .setColor('#A6FE00')

    const helpEmbed2 = new Discord.MessageEmbed()
    .setAuthor(`Help - Boost Detectors`, client.user.displayAvatarURL({dynamic: true}))
    .setDescription('Here are some variables that you can use for `Boost Message` Make sure to use curly brackets!\n\n**{user}** - The person who boosted in a proper format, Example: `BiizoNinja#6969`\n**{user.mention}** - Mentions the user that boosted the server\n**{server}** - The name of the server\n**{boost.count}** - amount of boosts the server has')
    .setColor('#A6FE00')
    
    const helpEmbed3 = new Discord.MessageEmbed()
    .setAuthor(`Help - Boost Detectors`, client.user.displayAvatarURL({dynamic: true}))
    .setDescription('Here you can see how to set up settings')
    .setImage('https://media.discordapp.net/attachments/869823340947316737/869826598147342388/unknown.png?width=747&height=269')
    .setColor('#A6FE00')
    
    const helpEmbed4 = new Discord.MessageEmbed()
    .setAuthor(`Help - Boost Detectors`, client.user.displayAvatarURL({dynamic: true}))
    .setDescription('Here is how it will look in Boost Channel.')
    .setImage('https://media.discordapp.net/attachments/869823340947316737/869827463105101844/unknown.png')
    .setColor('#A6FE00')

    const pages = [helpEmbed1, helpEmbed2, helpEmbed3, helpEmbed4];
    const textPageChange = true;
    const emojis = ["⏪", "⏩"];
    const time = 30000;
 
    ReactionPages(message, pages, textPageChange, emojis, time);

}; 

}
}