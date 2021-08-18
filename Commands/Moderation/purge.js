const Discord = require("discord.js");
const {Permissions} = require('discord.js')

module.exports = {
  name: "purge",
  description: "deletes messages in a channel for bu a user",
  usage: "purge <amount> [channel]",
  aliases: ["clear"],
  run: async (client, message, args) => {
    if (!message.member.permissionas.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.channel.send({ content: "<:wrong:856162786319925270> You need the `MANAGE_MESSAGES` permission to use this command."})

    const amount = parseInt(args[0]);
    if (!amount)
      return message.channel.send({
        content:
          "<:wrong:856162786319925270> You need to provide a number of messages to purge"
      });
    if (isNaN(amount))
      return message.channel.send({
        content:
          "<:wrong:856162786319925270> You need to provide a **valid** number of messages to purge"
      });

    var channel = message.mentions.channels.last();
    if (!channel) {
      channel = message.channel;
    }

    let messages = await channel.bulkDelete(amount);
    const msg = await message.channel.send({
      content:
        `<:greenTick:854228019312066571> Deleted ${messages.size}/${amount} number of messages in <#${channel.id}>`
    });

    setTimeout(() => {
      msg.delete();
    }, 3000);
  },
};