const Discord = require("discord.js");

module.exports = {
  name: "unaccept",
  run: async (client, message, args) => {
    if (message.author.id !== "546631496673394688") return;

    const messageID = args[0];
    const acceptQuery = args.slice(1).join(" ");

    if (!messageID) return message.channel.send("Please Specify a message ID");
    if (!acceptQuery) return message.channel.send("Please Specify a reason");
    try {
      const suggestionChannel =
        message.guild.channels.cache.get("858710996436254730");
      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);

      const data = suggestedEmbed.embeds[0];
      const denyEmbed = new Discord.MessageEmbed()

        .setTitle("Suggestion!")
        .setAuthor(data.author.name, data.author.iconURL)
        .setDescription(data.description)
        .setColor("RED")
        .addField("**Status:** DENIED", acceptQuery)
        .setAuthor("FLAME BOT");
      suggestedEmbed.edit(denyEmbed);

      const user = await client.users.cache.find(
        (u) => u.tag === data.author.name
      );
      const denyedEmbed = new Discord.MessageEmbed()
        .setAuthor(data.author.name, data.author.iconURL)
        .setDescription(data.description)
        .setColor("RED")
        .addField("**Status:** DENIED", acceptQuery)
        .setAuthor("FLAME BOT");
      user.send(denyedEmbed);
      message.channel.send("Suggestion Denied!");
    } catch (err) {
      console.log(err);
      message.channel.send("That suggestion does not exist!");
    }
  },
};