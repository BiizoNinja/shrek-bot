module.exports = {
  name: "server-info",
  aliases: ["si"],
  description: "This shows the server info",
  usage: "server-info",
  cooldown: 0,
  run: async (client, message, args) => {
    const Discord = require("discord.js");

    const embed = new Discord.MessageEmbed()
      .setAuthor(`Info about ${message.guild.name}`, message.guild.iconURL({dynamic:true}))
      .setDescription("Some simple server info!")
      .addFields(
        {
          name: `Server name 🎗️`,
          value: `${message.guild.name}`,
          inline: true,
        },
        { name: `Server id 🆔`, value: `${message.guild.id}`, inline: true },
        {
          name: `Members 👥`,
          value: `${message.guild.memberCount}`,
          inline: true,
        },
        {
          name: `Server roles 🔐`,
          value: `**${message.guild.roles.cache.size}** Roles`,
          inline: true,
        },
        {
          name: `Channels 💬 `,
          value: `** <:channel:876733485681893426> ${message.guild.channels.cache.filter((ch) => ch.type === "GUILD_TEXT").size} Text Channels**\n
          **<:voiceChannel:876733559568732211> ${message.guild.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size} Voice Channels**\n
          ** <:categoryChannel:876733443281682463> ${message.guild.channels.cache.filter((ch) => ch.type === "GUILD_CATEGORY").size} Categories**\n
          ** <:announcementChannel:876733775256621086> ${message.guild.channels.cache.filter((ch) => ch.type === "GUILD_NEWS").size} Announcement Channels**`,
          inline: true,
        },
        {
          name: `Verification Level 📑`,
          value: `${message.guild.verificationLevel}`,
          inline: true,
        },
        {
          name: `Created at 📆`,
          value: `${message.guild.createdAt.toLocaleString()}`,
          inline: true,
        },
        {
          name: `Boosts ✨`,
          value: `${message.guild.premiumSubscriptionCount}`,
          inline: true,
        }
      )
      .setThumbnail(message.guild.iconURL({ dynamic: true, format: "png" }))
      .setColor(message.guild.me.displayHexColor);

    message.channel.send({embeds: [embed]});
  },
};
