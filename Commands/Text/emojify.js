const Discord = require("discord.js");
const emoji = require("discord-emoji-convert");

module.exports = {
  name: "emojify",
  description: "Makes your text into emojie+",
  aliases: ["emoji"],
  usage: "emojify <message>",
  cooldown: 0,
  run: async (client, message, args) => {
    const fullMessage = args.join(" ");

    if (!fullMessage)
      return message.channel.send(`You need to specify something to emojify.`);
        if(fullMessage.includes('@everyone') || fullMessage.includes('@here')) return message.channel.send('<:wrong:856162786319925270> You aren\'t allowed to use this to ping everyone!')
        if(fullMessage.includes('<@&')) return message.channel.send('<:wrong:856162786319925270> You aren\'t allowed to use this to ping everyone!')
        

    const result = emoji.convert(fullMessage);
    message.channel.send(result);
  },
};
