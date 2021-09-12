const Discord = require("discord.js");

module.exports = {
  name: "about",
  description: "about shrebot!",
  usage: "about",
  cooldown: 0,
  run: async (client, message, args) => {

    const ghButton = new Discord.MessageButton()
      .setStyle('LINK')
      .setURL('https://github.com/BiizoNinja/shrek-bot')
      .setLabel('Source Code')
      .setEmoji('<:github:878516788013457450>')
    
    const invButton = new Discord.MessageButton()
      .setStyle('LINK')
      .setURL('https://dsc.gg/shrekbot')
      .setLabel('Invite Me')
      .setEmoji('<:addSymbol:870284681218768906>')
    
    const supportButton = new Discord.MessageButton()
      .setStyle('LINK')
      .setURL('https://discord.gg/V9DHGNtuUe')
      .setLabel('Support Server')
      .setEmoji('<a:support:878518477055483925>')
    

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `About - ShrekBot`,
        client.user.displayAvatarURL({ dynamic: false })
      )
      .setDescription(`Shrekbot is an epic discord bot with moderation, utility, fun, tools, tickets etc! It is also an open Source bot`)
      .setColor('A6FE00');
    
    const row = new Discord.MessageActionRow()
      .addComponents(ghButton)
      .addComponents(invButton)
      .addComponents(supportButton)

    message.channel.send({ embeds: [embed], components: [row] });
  },
};
