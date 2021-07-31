const Discord = require("discord.js");
module.exports = {
  name: "bold",
  description: "Makes your messages in to **bold**",
  aliases: ["bold"],
  usage: "boldify <message>",
  cooldown: 0,
  run: async (client, message, args) => {
    const fullMessage = args.slice(0).join(" ");

    if (!fullMessage)
      return message.reply("You need to specify something to bold.");

        const fullMessage = args.slice(0).join(" ")
        if(fullMessage.includes('@everyone') || fullMessage.includes('@here')) return message.channel.send('<:wrong:856162786319925270> You aren\'t allowed to use this to ping everyone!')
        if(fullMessage.includes('<@&')) return message.channel.send('<:wrong:856162786319925270> You aren\'t allowed to use this to ping everyone!')

        if(!fullMessage) return message.reply('<:wrong:856162786319925270> You need to specify something to bold.')

    message.channel.send(
      `**${fullMessage}**\n\nRequested by: ${message.author.tag}`
    );
  },
}
