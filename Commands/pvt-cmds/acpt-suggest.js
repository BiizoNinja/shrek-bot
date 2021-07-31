const Discord = require("discord.js");

module.exports = {
  name: "accept",
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
      const acceptEmbed = new Discord.MessageEmbed()

        .setTitle("Suggestion!")
        .setAuthor(data.author.name, data.author.iconURL)
        .setDescription(data.description)
        .setColor("GREEN")
        .addField("**Status:** ACCEPTED", acceptQuery);
      const acceptEmbededit = data.addField("**Status:** ACCEPTED", acceptQuery);

      suggestedEmbed.edit(acceptEmbededit);
      message.channel.send("Suggestion Accepted!");

      const user = await client.users.cache.find(
        (u) => u.tag === data.author.name
      );
      const approveEmbed = new Discord.MessageEmbed()
        .setAuthor(data.author.name, data.author.iconURL)
        .setDescription(data.description)
        .setColor("GREEN")
        .addField("**Status:** ACCEPTED", acceptQuery);
      user.send(approveEmbed);
    } catch (err) {
      console.log(err);
      message.channel.send("That suggestion does not exist!");
    }
  },
};
