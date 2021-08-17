const { tictactoe } = require("reconlx");
const Discord = require("discord.js");

module.exports = {
  name: "tictactoe",
  description: "Plays a game to tictactoe",
  usage: "tictactoe <@mention>",
  aliases: ["ttt"],
  cooldown: 0,
  run: async (client, message, args) => {
    const member = message.mentions.users.first();
    if (!member)
      return message.channel.send({ content: "Please specify a member to play with!" });

    if (member.id == message.author.id)
      return message.channel.send({ content: "You can't play with yourself!?!" });
    if (member.bot) return message.channel.send({ content: "you can't play with bots" });

    new tictactoe({
      player_two: member,
      message: message,
    });
  },
};
