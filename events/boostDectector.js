const client = require('../index')
const schema = require('../models/boostMessage')

client.on('guildMemberUpdate', async (oldMember, newMember) => {

    const oldStatus = oldMember.premiumSince;
    const newStatus = newMember.premiumSince; 

    const guild = newMember.guild

    const boostData = await schema.findOne({
      GuildID: guild.id
    });
    if(!boostData) return;

    if(boostData.BoostChannel == 'None') return; 
    if(boostData.BoostMessage == 'None') return; 

const boostChannel = guild.channels.cache.get(boostData.BoostChannel)
const boostMessage = boostData.BoostMessage; 

if(!oldStatus && newStatus) {

 const finalMessage = boostMessage
 .replace(/{server}/g, guild.name)
 .replace(/{user}/g, newMember.user.tag)
 .replace(/{user.mention}/g, `<@${newMember.user.id}>`)
 .replace(/{boost.count}/g, guild.premiumSubscriptionCount)

boostChannel.send(finalMessage)
}; 

if(oldStatus && !newStatus) return;

});