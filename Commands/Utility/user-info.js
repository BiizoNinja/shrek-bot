const { MessageEmbed } = require("discord.js");

const flags = {
  DISCORD_EMPLOYEE: "Discord Employee",
  DISCORD_PARTNER: "Discord Partner",
  BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
  BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
  HYPESQUAD_EVENTS: "HypeSquad Events",
  HOUSE_BRAVERY: "House of Bravery",
  HOUSE_BRILLIANCE: "House of Brilliance",
  HOUSE_BALANCE: "House of Balance",
  EARLY_SUPPORTER: "Early Supporter",
  TEAM_USER: "Team User",
  SYSTEM: "System",
  VERIFIED_BOT: "Verified Bot",
  VERIFIED_DEVELOPER: "Verified Bot Developer",
};

const moment = require("moment");
const Discord = require('discord.js')
const { emojis, colors, others } = require('../../assets.json')

module.exports = {
  name: 'user-info',
  description: 'Check the user-info',
  usage: 'user-info',
  aliases: ['userinfo', 'memberinfo', 'whois'],
  run: async (client, message, args) => {
     
    const member = message.mentions.members.last() || message.member;
    const roles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);
    const userFlags = member.user.flags.toArray();
    if (!member.user.activities) member.user.activities = { name: `${emojis.wrong} - None` };
    
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Info about ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`Here is some info about the user!`)
      .addFields(
          {
            name: 'Username',
            value: member.user.username,
            inline: true
        }, {
            name: 'Discriminator',
            value: member.user.discriminator,
            inline: true
        }, {
            name: 'ID',
            value: member.user.id,
            inline: true          
        }, {
            name: 'Badges',
            value: userFlags.length ? userFlags.map((flag) => flags[flag]).join(", "): "None",
            inline: true            
        }, {
            name: 'Avatar',
            value: `[Link](${member.user.displayAvatarURL({dynamic:true})})`,
            inline: true 
       }, {
            name: 'Time Created',
            value: `${moment(member.user.createdTimestamp).format("LT")} ${moment(member.user.createdTimestamp).format("LL")} ${moment(member.user.createdTimestamp).fromNow()}`,
            inline: true           
       }, {
           name: `Nickname`,
           value: member.nickname || "None",
           inline: true   
       }, {
           name: `Roles`,
           value: roles.length ? roles.join(", ") : "None",
           inline: true            
       }
        
    )
          .setFooter(
        `Requested by ${message.author.username}`,
        `${message.author.displayAvatarURL({ dynamic: true })}`
    )
    .setColor(colors.defaultColor)
    return message.channel.send({embeds: [embed]});
  }
}

