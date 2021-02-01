const Discord = require('discord.js')

module.exports = {
    name: 'gamble',
    description: 'Gamble some money ;). Be careful before the FBI comes looking-',
    usage: 's!gamble <amount>',
    examples: 's!gamble 500',
    execute: async(Client, message, args) => {
        const amount = args[0]

        if(!amount) {
            message.channel.send('You need to specify an amount to gamble. <:FLOOSHED:805796808159658026> ')
        }
        const gamble = Math.floor(Math.random()* (1000 - amount) + amount)

        if(amount > 1000) return message.channel.send('You can\'t gamble amount more than 1000.')

         else if(gamble > amount) {

        let embed = new Discord.MessageEmbed()
        .setTitle(` I win! <:msgrinlegs:805805225255895050> `) 
        .setDescription(`I got ${gamble}! GG! It was fun playing with you`)
        .setFooter(`Note: This data WON'T be saved, this is just a fun command`)
        .setTimestamp()
        .setColor('#ff0000')

        message.channel.send(embed);
        }

        else if(gamble < amount) {

        let embed1 = new Discord.MessageEmbed()
        .setTitle(` I lost <:pepe_cry:805807162864959489>`) 
        .setDescription(`I got ${gamble}! GG! It was fun playing with you`)
        .setFooter(`Note: This data WON'T be saved, this is just a fun command`)
        .setTimestamp()
        .setColor('#00ff00')

        message.channel.send(embed1)
    }

        

    } 
}