module.exports = {
    name: 'infinity',
    description: 'SOME VERY EPIC people who have **infinity** coins in ShrekBot!',
    usage: 's!infinity',
    aliases: [`inf`],
    execute: async(Client, message, args) => { 

      const Discord = require('discord.js')

      let embed = new Discord.MessageEmbed()
      .setTitle(`These people have INFINITY COINS!`)
      .setDescription(`Note: There is no way you can get Infinity coins! This was just a fun event for 1 day only! Don't expect you guys to get Infinity coins :/ `)
      .addFields(
        {name: '\u200c' , value: '`639734140157165569` - **Hackerboi 69**' },
        {name: '\u200c' , value: '`709686745473613834` - **シ𝑹𝒂𝒏𝒃𝒐𝒐シ**' },
        {name: '\u200c' , value: '`639734140157165569` - **mallusrgreatv2**' }
      )
      .setFooter('arent these people pog', message.guild.iconURL({dynamic: true}))
      .setColor('RANDOM')
      
      message.channel.send(embed)
      
    }
}