const Discord = require('discord.js');

module.exports = {
name: 'ban',
description: 'Bans Users!',
usage: 'ban <user> <reason>',
cooldown: 0 ,
cooldown: 0,
run: async (client, message, args) => {

    const target = message.mentions.members.first()
    
    if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(' <:wrong:856162786319925270> You don\'t have the permission to do this! ')
    if(!target) return message.channel.send(`<:wrong:856162786319925270> Please specify a member to ban.`)
    if(target == message.author) return message.channel.send('<:wrong:856162786319925270> You can\'t ban yourself! ')
    if(target == message.guild.owner) return message.channel.send('<:wrong:856162786319925270> You can\'t ban the owner! ')
    
    const reason = args.slice(1).join(' ')
    if(!reason) return message.channel.send(' <:wrong:856162786319925270> Please provide a reason to ban!')

    const targetMember = message.guild.members.cache.get(target.id)
    targetMember.ban({
        days: 0,
        reason: `Ban Requested from ${message.author.tag}, Reason: ${reason}`
    }).then(() => {
        const embed = new Discord.MessageEmbed()
        .setDescription(`Banned **${target.tag}**, For the reason **${reason}**`)
        .setTimestamp()
        .setColor(`GREEN`)
        message.channel.send({embeds: [embed]})
        target.send(`You have been banned from **${message.guild.name}**, From the moderator ${message.author.tag}(\`${message.author.tag}\`)`)
    })
}
}