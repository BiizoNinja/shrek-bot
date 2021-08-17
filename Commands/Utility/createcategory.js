const Discord = require("discord.js");

module.exports = {
  name: "createcategory",
  description: "Create a category channel!",
  usage: "createcategory <name>",
  cooldown: 0,
  aliases: ["ccategory"],
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.channels.send({
        content:
          "You need the `MANAGE_CHANNELS` permission to use this command"
      });
    const name = args[0];
    if (!name)
      return message.channel.send({
        content:
          "<:wrong:856162786319925270> You need to provide a name!"
      });

    const newChannel = message.guild.channels.create(`${name}`, {
      type: "GUILD_CATEGORY",
      reason: `requested by ${message.author.tag}`,
    });
    const embed = new Discord.MessageEmbed()
      .setTitle(`Channel Created!`)
      .setDescription(`Created a category channel with the name: ${name}`)
      .setColor("GREEN")

    message.channel.send({embeds: [embed]});
  },
};
