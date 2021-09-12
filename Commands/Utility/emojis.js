const { EmbedPages } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const { colors } = require('../../assets.json')

module.exports = {
  name: "emojis",
  description: "View all emojis in the guild",
  category: "utility",
  cooldown: 0,
  run: async (client, message, args) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed1 = new MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name}.`)
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`
      )
      .setColor(colors.defaultColor);
    message.channel.send({embeds: [Embed1]});
  },
};
