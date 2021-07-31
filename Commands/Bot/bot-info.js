const Discord = require("discord.js");
module.exports = {
  name: "bot-info",
  description: "Get info about the bot.",
  aliases: ["botinfo", "bi"],
  usage: "bot-info",
  cooldown: 0,
  run: async (client, message, args) => {
    let uptime = ``;
    let totalseconds = client.uptime / 1000;
    let hours = Math.floor(totalseconds / 3600);
    totalseconds %= 3600;
    let minutes = Math.floor(totalseconds / 60);
    let seconds = Math.floor(totalseconds % 60);

    if (hours > 23) {
      days = days + 1;
      hours = 0;
    }

    if (minutes > 60) {
      minutes = 0;
    }

    uptime += ` **${hours}** hours, **${minutes}** minutes and **${seconds}** seconds`;

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
        { name: "Time Until Last Restarted", value: uptime, inline: true }
      )
      .setFooter(`PREFIX - '.'`)
      .setColor(message.guild.me.displayHexColor);

    await message.channel.send(embed);
  },
};
