const Discord = require("discord.js");
module.exports = {
  name: "ship",
  description: "ship someone!",
  usage: "ship",
  cooldown: 0,
  run: async (client, message, args) => {
    let ship = Math.floor(Math.random() * 100) + 1;

    let user = message.mentions.users.first();
    if (user.id == message.author.id)
      return message.channel.send("ayo you cant yourself");
    let robber = message.author;

    if (!user) {
      return message.channel.send(
        "Make sure you pick a person who you want to ship!"
      );
    }

    let embed = new Discord.MessageEmbed()
      .setTimestamp(Date.now())
      .setTitle("Hmmmm who are we Shipping today?")
      .setDescription(
        `**${robber.username}** & **${user.username}** your match is... ${ship}%`
      )
      .setColor(`RANDOM`);
    message.channel.send(embed).then((m) => {
      m.react("❤");
      m.react("💙");
    });
  },
};
