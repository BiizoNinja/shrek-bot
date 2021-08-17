const client = require("../index");

client.on("guildCreate", (guild) => {
  const channel = guild.channels.cache.find(
    (channel) =>
      channel.type === "text" &&
      channel.permissionsFor(guild.me).has("SEND_MESSAGES")
  );

  if (!channel) return;
  const Discord = require("discord.js");
  const embed = new Discord.MessageEmbed()
    .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
    .setTitle("Thank You!")
    .setDescription(
      `Thank you! **${guild.name}**! For inviting me!! I am ShrekBot an [__open source__](https://github.com/BiizoNinja/shrek-bot) discord bot, I am developed by \`BiizoNinja#6969\` and all the amazing people who forked and contributed to my github repository :blush:\nI will do my very best to help out in the server.`
    )
    .addField(
      "Important Links",
      "[Support Server](https://discord.gg/V9DHGNtuUe 'Click Here To Join')\n[Invite ShrekBot](https://dsc.gg/shrekbot 'Click Here To Invite')\n[Source Code(GitHub)](https://github.com/BiizoNinja/shrek-bot 'Click Here To View')"
    )
    .setColor("RANDOM")
    .setFooter("For support join the support server!")
    .setTimestamp();
  channel.send({embeds: [embed]});
});
