const Discord = require("discord.js");
const {Permissions} = require('discord.js')

module.exports = {
  name: "createchannel",
  description: "Create a text channel!",
  usage: "createchannel <name>",
  cooldown: 0,
  aliases: ["cchannel"],
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
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
      type: "GUILD_TEXT",
      reason: `requested by ${message.author.tag}`,
    });
    const embed = new Discord.MessageEmbed()
      .setTitle(`Channel Created!`)
      .setDescription(`Created a text channel with the name: ${name}`)
      .setColor("GREEN")

    message.channel.send({embeds: [embed]});
  },
};
