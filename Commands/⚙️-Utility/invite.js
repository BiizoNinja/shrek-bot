const Discord = require('discord.js')
module.exports = {
   name: 'aboutme',
   description: 'Get info about the bot.',
   aliases: ["ame"],
   usage: 's!aboutme',
   execute: async(Client, message, args) => {

       let inviteEmbed = new Discord.MessageEmbed()

       .setTitle(`About  ShrekBot`)
       .setDescription(`ShrekBot is a multi-purpose discord bot. It has memes, levelling economy with customizable rewards! Add it you your discord server today!`)
       .addFields(
           {name:'<a:gold_arrow:799265384188477521> Link to invite', value:`[Click here!](https://bit.ly/ShrekInvite)`},
           {name:'<a:loadingred:799265479112916993> Support Server', value:`[Click here!](https://discord.gg/CgzBqZjz2v)`},
           {name: '<a:topgg:804957699506831391> Vote here', value: `[Vote here!](https://top.gg/bot/789129116015525918`}
       )
       .setColor('#00f6e3')
       .setFooter(`Requested By ${message.author.tag}  •  Made By BiizoNinja#3337`, message.author.displayAvatarURL({ dynamic: true }))
       

       await message.channel.send(inviteEmbed)
   }
}