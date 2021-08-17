const discord = require("discord.js");
const fetch = require("node-fetch");
require('dotenv').config()

module.exports = {
  name: "youtube-together",
  description: "watch youtube on discord",
  usage: "youtube-together",
  aliases: ["yt", "yt-together"],
  cooldown: 0,
  run: async (client, message, args) => {
    let channel = message.member.voice.channel;
    if (!channel) return message.channel.send("You have to be in a vc");

    let invite = await (
      await fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
          max_age: 86400,
          max_uses: 0,
          target_application_id: "755600276941176913",
          target_type: 2,
          temporary: false,
          validate: null,
        }),
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
    ).json();
    if (!invite.code)
      return message.channel.send({content: `<:wrong:856162786319925270> There was a error!`});
    const e = new discord.MessageEmbed()
      .setAuthor(
        "YouTube but on discord?!!",
        "https://media.discordapp.net/attachments/796358841038143488/851878274179399751/youtube.png"
      )
      .setColor(message.guild.me.displayHexColor)
      .setDescription(
        `\n[Click me](https://discord.com/invite/${invite.code}) to watch youtube together.`
      )
      .setTimestamp();

    message.channel.send({embeds: [e]});
  },
};
