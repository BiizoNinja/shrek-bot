const Discord = require('discord.js')
const profileSchema = require('../../models/profileSchema')

module.exports = {
    name: 'balance',
    description: 'Check your balance!',
    usage: 's!bal ',
    examples: 's!bal',
    aliases: ["bal", "coins"],
    execute: async(Client, message, args) => {

        let profileData;
        try{
            profileData = profileSchema.findOne({ userId: message.author.id})
            if(!profileData) {
                userId: message.author.id
                coins: 0
                bank: 0 
            }
        } catch(err) {
        console.log(err)
        }
    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.tag}'s Balance!`, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`**Wallet:** ${profileData.coins}\n **Bank:** ${profileData.bank}`)
    .setFooter('pretty cool right? 😳')

    message.channel.send(embed)
    }
}
