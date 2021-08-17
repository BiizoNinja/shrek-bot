const Discord = require("discord.js");
const { WebhookClient } = require("discord.js");

module.exports = {
  name: "report-bug",
  description: "Make a bug report",
  usage: "report-bug <bug>",
  cooldown: 0,
  run: async (client, message, args) => {
    const suggestchannel = client.channels.cache.find(
      (channel) => channel.id === "858711068167897100"
    );
    if (!args[0])
      return message.channel.send("Error! Please do: `.report-bug <Bug>` ");

    const guild = message.guild;
    const wc = new WebhookClient("", "");
    const suggestembed = new Discord.MessageEmbed()
      .setColor("#ff0000")
      .setTitle("Bug Report!")
      .setDescription(`**Bug:** ${args.slice(0).join(" ")}\n\n`)
      .addField("Guild Info", `${message.guild.name} • \`${message.guild.id}\``)
      .addField(
        "Owner Info",
        `${message.author.tag} • \`${message.author.id}\``
      )
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setTimestamp();
    suggestchannel.send({embeds: [suggestembed]});

    wc.send({
      username: message.author.tag,
      avatarURL: message.author.displayAvatarURL({ dynamic: true }),
      embeds: [suggestembed],
    });

    const suggestionadded = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle("Reported!")
      .setDescription("Your bug report got added!");
    message.channel.send({embeds: [suggestionadded]});
  },
};
