const owo = require("owofy");

module.exports = {
  name: "owofy",
  description: "Makes your messages in to owo",
  aliases: ["owo"],
  usage: "owofy <message>",
  cooldown: 0,
  run: async (client, message, args) => {
    const fullMessage = args.slice(0).join(" ");

    if (!fullMessage) return message.reply({ content: "You need to specify something to make owo" });
    if (fullMessage.includes('@everyone') || fullMessage.includes('@here')) return message.channel.send({ content: '<:wrong:856162786319925270> You aren\'t allowed to use this to ping everyone!' })
    if (fullMessage.includes('<@&')) return message.channel.send({ content: '<:wrong:856162786319925270> You aren\'t allowed to use this to ping everyone!' })
      
    message.channel.send({ content: owo(`${fullMessage}`) });
  },
};
