const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",
  cooldown: 0,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const msg = await message.channel.send(`🏓 Pinging...`);
    const embed = new MessageEmbed()
      .setAuthor("Pong!", client.user.displayAvatarURL({dynamic:false}))
      .setDescription(
        `:globe_with_meridians: **WebSocket** ping is \`${client.ws.ping}ms\`\n :ping_pong: **Message edit** ping is \`${Math.floor(msg.createdAt - message.createdAt)}ms\``)
      .setColor('#A6FE00')
    .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({dynamic:true}))
    await message.reply({embeds: [embed]});
    msg.delete();
  },
};
