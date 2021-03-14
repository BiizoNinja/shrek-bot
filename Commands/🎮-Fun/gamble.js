const Discord = require('discord.js')

module.exports = {
    name: 'gamble',
    description: 'Gamble some money ;). Be careful before the FBI comes looking-',
    usage: '+gamble <amount>',
    examples: '+gamble 500',
    run: async(client, message, args) => {
        const amount = args[0]

        if(!amount) {
            message.channel.send('You need to specify an amount to gamble. <:FLOOSHED:805796808159658026> ')
        }
        const gamble = Math.floor(Math.random()* (1001 - amount) + amount)

        if(amount > 1000) return message.channel.send('You can\'t gamble amount more than 1000...')
        if(isNaN(args[0])) return message.channel.send('Please Gamble a number...')
        if(amount < 0) return message.channel.send(`You can't bet a negetive number...`)

         else if(gamble > amount) {

        let embed = new Discord.MessageEmbed()
        .setTitle(` I win! <:msgrinlegs:805805225255895050> `) 
        .setDescription(`I got **${gamble}**! haha you suck noob, begone! Go play fortnite :/`)
        .setFooter(`Note: This data WON'T be saved, this is just a fun command`)
        .setTimestamp()
        .setColor('#ff0000')

        message.channel.send(embed);
        }

        else if(gamble < amount) {

        let embed1 = new Discord.MessageEmbed()
        .setTitle(` I lost <:pepe_cry:805807162864959489>`) 
        .setDescription(`I got **${gamble}**! I know your using hax, don't worry gonna report soon :eyes:`)
        .setFooter(`Note: This data WON'T be saved, this is just a fun command`)
        .setTimestamp()
        .setColor('#00ff00')

        message.channel.send(embed1)
    }

        
    } 
}