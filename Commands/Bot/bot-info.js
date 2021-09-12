const Discord = require("discord.js");
module.exports = {
  name: "bot-info",
  description: "Get info about the bot.",
  aliases: ["botinfo", "bi"],
  usage: "bot-info",
  cooldown: 0,
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        "Info - ShrekBot",
        client.user.displayAvatarURL({ dynamic: false })
      )
      .setDescription("Do `.help` do get a list of commands")
      .addFields(
        {
          name: "Server Count",
          value: `${client.guilds.cache.size} Servers`,
          inline: true,
        },
        { name: "Language", value: `JavaScript ES5`, inline: true },
        { name: "Library", value: `discord.js`, inline: true },
        { name: "Bot Version", value: `0.01`, inline: true },
        {
          name: "Commands",
          value: `${client.commands.size} Commands!`,
          inline: true,
        },
      )
      .setColor('A6FE00');

    await message.channel.send({embeds: [embed]});
  },
};
