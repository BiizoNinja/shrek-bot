const Discord = require("discord.js")
const config = require('../../config.json')
const token = config.token

module.exports = {
 name: 'restart',
 description: '**ONLY DEVELOPER**',
 execute: async(Client, message, args) => {

    if(message.author.id !== "546631496673394688") return

    Client.destroy()
    await Client.login(process.env.token)

    message.channel.send('Restarted!')
    


    
 }
}