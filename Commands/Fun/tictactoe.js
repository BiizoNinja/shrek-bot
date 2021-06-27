const { tictactoe } = require('reconlx')
const Discord = require('discord.js')

module.exports = {
    name : 'tictactoe',
    description: "Plays a game to tictactoe",
    usage: "+tictactoe <@mention>",
    aliases: ["ttt"],
    run: async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member to play with!')
        
        const ttt = new tictactoe({
            player_two: member, 
            message: message
        }); 

        const embed = new Discord.MessageEmbed()
        .setDescription(ttt)
    }
    
}