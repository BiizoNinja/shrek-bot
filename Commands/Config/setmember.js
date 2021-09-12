const Discord = require("discord.js");
const schema = require("../../models/memberRole");
const {emojis, colors, others} = require('../../assets.json')
const {Permissions} = require('discord.js')

module.exports = {
  name: "setmember",
  description:"Set's the member role! if the server isn't using @everyone as their main role",
  usage: "setmember <role>",
  aliases: ["setmain"],
  run: async (client, message, args) => {       

    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.reply({content: `${emojis.wrong} You need the \`ADMINISTRATOR\` permission to use this!`, alowedMention: {repliedUser: false}});
    
    const data = await schema.findOne({
      GuildID: message.guild.id,
    });

    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) return message.reply({content:  `${emojis.wrong} You need to specify a role!`,  allowedMentions: {repliedUser: false}});
     
    const successEmbed = new Discord.MessageEmbed()
      .setAuthor(`Success`, others.green_circle)
      .setDescription(`${emojis.success} Successfully set the Member role to **${role.name}**`)
      .setColor(colors.successcolor)
    
    if (data) {
      schema.findOneAndUpdate(
        {
          GuildID: message.guild.id,
        },
        {
          MemberRole: role.id,
        }
      );
      message.reply({embeds: [successEmbed], allowedMentions: {repliedUser: false}});
    }

    if (!data) {
      new schema({
        GuildID: message.guild.id,
        MemberRole: role.id,
      }).save();
      message.reply({embeds: [successEmbed], allowedMentions: {repliedUser: false}});
    }
  },
};
