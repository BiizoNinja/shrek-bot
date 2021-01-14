const Discord = require('discord.js')
module.exports = {
   name: 'invite',
   description: 'Invite the bot, to your own server!',
   aliases: ["inv"],
   usage: 's!invite',
   run:async (Client, message, args)  => {

       let inviteEmbed = new Discord.MessageEmbed()

       .setTitle(`Invite ShrekBot`)
       .setDescription(`ShrekBot is a multi-purpose discord bot. It has memes, levelling economy with customizable rewards! Add it you your discord server today!`)
       .addFields(
           {name:'Link to invite', value:`[Click here!](https://bit.ly/ShrekInvite)`}
       )
       .setColor('#00f6e3')
       .setFooter(`Requested By ${message.author.tag}  •  Made By BiizoNinja#3337`, message.author.displayAvatarURL({ dynamic: true }))
       

       await message.channel.send(inviteEmbed)
   }
}