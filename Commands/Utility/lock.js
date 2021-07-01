const Discord = require('discord.js');

module.exports = {
name: 'lock',
description: 'locks channels!',
usage: 'lock <#channel>',
cooldown: 0 ,
aliases: ['lockchannel'],
run: async (client, message, args) => {

            if (!message.member.permissions.has('MANAGE_CHANNELS')) return message.reply('You do not have the permission to do this!');
            if (!args[0]) return message.channel.esnd('You did not mention any channels!');
            if (!message.mentions.channels.first()) return message.channel.send('You did not mention any valid channels!');
    
            const role = message.guild.roles.cache.find(role => role.name === '@everyone');
    
            await message.mentions.channels.forEach(async channel => {
                if (channel.name.startsWith('🔒')) return message.channel.send(`<#${channel.id}> has been already locked!`);
                await channel.setName(`${channel.name}`);
                try {
                    await channel.updateOverwrite(role, {
                        SEND_MESSAGES: false
                    });
                    message.channel.send(`**Successfully** locked <#${channel.id}>!`)
                } catch (err) {
                    console.log(err)
                    message.channel.send('Something has went wrong while locking the channels. [Please report this issuse at the support server!')
                }
            })
        }
        
    }

