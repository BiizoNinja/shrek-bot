const economy = require('../../economy')
const Discord = require('discord.js')

module.exports = {
    name: 'balance',
    description: 'Check your balance!',
    usage: 's!bal [@user]',
    examples: 's!bal || s!bal @BiizoNinja',
    aliases: ["bal", "coins"],
    execute: async(Client, messsage, args, profileData) => {

    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.tag}'s Balance!`, messsage.author.displayAvatarURL({dynamic: true}))
    .setDescription(`**Wallet:** ${profileData.coins}\n **Bank:** ${profileData.bank}`)
    .setFooter('pretty cool right? 😳')
    
    messsage.channel.send(embed)
    }
}
