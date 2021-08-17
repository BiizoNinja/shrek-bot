const Discord = require("discord.js");
const schema = require("../../models/memberRole");

module.exports = {
  name: "lock",
  description: "locks the channel",
  usage: "lock",
  cooldown: 0,
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send({content:
        "<:wrong:856162786319925270> You need to be staff to use this! "
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

      channel.updateOverwrite(everyoneRole, {
        SEND_MESSAGES: false,
      });
      const msg = await channel.send({ content:
        `<:greenTick:854228019312066571> Successfully locked <#${channel.id}>! for the reason: **${reason}**`
      });

      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} Locked Channel!`,
          `https://cdn.discordapp.com/emojis/798779224470585404.gif?v=1`
        )
        .setDescription(`Channel Locked!\nFor the reason: **${reason}**`)
        .setColor("RANDOM");
      message.channel.send({embeds: [embed]});

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

      channel.updateOverwrite(role, {
        SEND_MESSAGES: false,
      });
      const msg = await channel.send({content:
        `<:greenTick:854228019312066571> Successfully locked <#${channel.id}>! for the reason: **${reason}**`
    });

      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag} Locked Channel!`,
          `https://cdn.discordapp.com/emojis/798779224470585404.gif?v=1`
        )
        .setDescription(`Channel Locked!\nFor the reason: **${reason}**`)
        .setColor("RANDOM");
      message.channel.send({embeds: [embed]});

      setTimeout(() => {
        msg.delete();
      }, 3000);
    }
  },
};
