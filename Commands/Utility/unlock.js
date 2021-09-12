const Discord = require("discord.js");
const schema = require("../../models/memberRole");
const {Permissions} = require('discord.js')

module.exports = {
  name: "unlock",
  description: "unlocks the channel",
  usage: "unlock",
  cooldown: 0,
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
      return message.channel.send({
        content:
        "<:wrong:856162786319925270> You need to have the `MANAGE_CHANNELS` permission to use this! "
      });

    const data = await schema.findOne({
      GuildID: message.guild.id,
    });

    if (!data) {
      const everyoneRole = message.guild.roles.everyone;

      var channel = message.mentions.channels.last();
      if (!channel) {
        channel = message.channel;
      }

      const reason = args.join(" ") || "None";

      channel.permissionOverwrites.edit(everyoneRole, {
        SEND_MESSAGES: null,
      });
      const msg = await channel.send({content:
        `<:greenTick:854228019312066571> Successfully unlocked <#${channel.id}>! for the reason: **${reason}**.`
    });

      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} unlocked Channel!`,
          `https://cdn.discordapp.com/emojis/798779186801803264.gif?v=1`
        )
        .setDescription(`Channel unlocked!\nFor the reason: **${reason}**`)
        .setColor("RANDOM");
      message.channel.send({embeds:[embed]});

      setTimeout(() => {
        msg.delete();
      }, 3000);
    }

    if (data) {
      const role = message.guild.roles.cache.get(data.MemberRole);

      var channel = message.mentions.channels.last();
      if (!channel) {
        channel = message.channel;
      }

      const reason = args.join(" ") || "None";

      channel.permissionOverwrites.edit(role, {
        SEND_MESSAGES: null,
      });
      const msg = await channel.send({ content:
        `<:greenTick:854228019312066571> Successfully unlocked <#${channel.id}>! for the reason: **${reason}**`
      });

      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} unlocked Channel!`,
          `https://cdn.discordapp.com/emojis/798779186801803264.gif?v=1`
        )
        .setDescription(`Channel unlocked!\nFor the reason: **${reason}**\nBy the moderator: <@${message.author.id}>`)
        .setColor("GREEN");
      message.channel.send({embeds: [embed]});

      setTimeout(() => {
        msg.delete();
      }, 3000);
    }
  },
};
