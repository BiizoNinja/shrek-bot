const mongoose = require('mongoose')
const blacklist = require('../../models/blacklisted-schema')
const Discord = require('discord.js')

module.exports = {
    name: 'blacklist',
    description: '**DEVELOPER ONLY**',
    execute: async(Client, message, args) => {
        if(message.author.id !== "546631496673394688") return message.channel.send(`This command can only be used by Developers, Current Devs are: BiizoNinja#9999`)

        const user = messsage.guild.members.cache.get(args[0])
        if(!user) return messsage.channel.send('That is NOT a valid user!')
        const reason = args[1].join(' ')

        blacklist.findOne({userId : user.user.id}, async(err, data) => {
            if(err) throw console.err;
            if(data) {
                messsage.channel.send(`**${user.username}** is already blacklisted!`)
            } else {
                data = new blacklist({userId: user.user.id})
                data.save()
            .catch(err => console.log(err))
            messsage.channel.send(`**${user.user.tag}** has been blacklisted from ShrekBot!\n For The Reason ${reason}.`)
            user.send(`You have been blacklisted from ShrekBot!\n For The Reason ${reason}.\n If you feel like this is an error, please contact the DEVs, \`BiizoNinja#9999\``)
            } 
        
        })
    }
}