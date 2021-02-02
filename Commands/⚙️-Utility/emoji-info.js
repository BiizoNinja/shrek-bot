module.exports = {
    name: 'emojiinfo',
    aliases: ['si'],
    description: "This shows the server info",
    usage: "s!server-info",
    execute: async (Client, message, args) => {
     const Discord = require('discord.js')
     const emoji = args[0]

     if(!emoji) return message.channel.send('<a:XMARK:801450921112371232> You have not supplied an emoji') 
     if(emoji.animated === true) return 'True'
     if(emoji.animated === false) return 'False'
     const emojiCreatedTimestamp = new Date(emoji.createdTimestamp).toUTCString()
     if(emoji) {
         let embed = new Discord.MessageEmbed()
         .setTitle('Emoji Info!')
         .setDescription('Here is some info about the emoji!') 
         .addFields(
             {name: 'Animated?' , value: `${emoji.animated}`},
             {name: 'Name + ID' , value: `${emoji.name} ${emoji.id}` , inline: true},
             {name: 'Created At', value: `${emojiCreatedTimestamp}`}

         )
         message.channel.send(embed)
     }
     
    
    }
}