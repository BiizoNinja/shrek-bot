const figlet = require("figlet");

module.exports = {
  name: "ascii",
  description: "Makes a banner!",
  usage: "ascii <your text>",
  cooldown: 0,
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send({ content: "please provide a some text" });
    dd = args.slice(0).join(" ");
    figlet.text(dd, function (err, data) {
      if (err) {
        message.reply({ content: "something went wrong" });
      }
      if (data.length > 2000)
        return message.channel.send({
          content:
            "please provide text that is fewer than 100 characters"
        });
      message.channel.send({ content: "```" + data + "```" });
    });
  },
};
