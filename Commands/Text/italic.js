const Discord = require("discord.js");
module.exports = {
  name: "italic",
  description: "Makes your messages in to *italic*",
  aliases: ["italify"],
  usage: "italic <message>",
  cooldown: 0,
  run: async (client, message, args) => {
    const fullMessage = args.slice(0).join(" ");
    if (fullMessage.includes('@everyone') || fullMessage.includes('@here')) return message.channel.send({ content: '<:wrong:856162786319925270> You aren\'t allowed to use this to ping everyone!' })
    if (fullMessage.includes('<@&')) return message.channel.send({ content: '<:wrong:856162786319925270> You aren\'t allowed to use this to ping everyone!' })
        
    if (!fullMessage)
      return message.reply({ content: "You need to specify something to make italic." });

    message.channel.send({content: 
      `*${fullMessage}*\n\nRequested by: ${message.author.tag}`
  });
  },
};
