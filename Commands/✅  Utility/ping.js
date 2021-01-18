const Discord = require('discord.js')
module.exports = {
   name: 'ping',
   description: 'Shows the bot\'s ping',
   aliases: ["beep"],
   usage: 's!ping',
   execute:async(Client, message, args) => {

    await message.channel.send('PINGING!').then(pingMessage => {
            
        const start = message.createdTimestamp;
        const end = pingMessage.createdTimestamp;
        const subtraction = end - start;

        let PingEmbed = new Discord.MessageEmbed()
        
           .setTitle('My ping! <:ShrekHappy:789749401169559563>')
           .setDescription(` My ping is ${subtraction} ms`)
           .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
           .setColor(' #17ab00 ')
           
    
        
        pingMessage.edit(PingEmbed)
        })

}
}
   


