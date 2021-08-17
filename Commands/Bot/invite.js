const Discord = require("discord.js");

module.exports = {
  name: "invite",
  description: "Get the invite links of the bot",
  usage: "invite",
  cooldown: 0,
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        "Invite - ShrekBot",
        client.user.displayAvatarURL({ dynamic: false })
      )
      .setDescription(
        `Join Support Server: [Click me](https://discord.gg/V9DHGNtuUe)\nInvite Link (recommended): [Click me](https://dsc.gg/shrekbot)\nInvite Link (admin): [Click me](https://discord.com/oauth2/authorize?client_id=855803758645870613&permissions=8&scope=bot%20applications.commands)`
      )
      .setColor(message.guild.me.displayHexColor);

    message.channel.send({embeds: [embed]});
  },
};
