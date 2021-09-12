const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { emojis } = require('../../assets.json')
const {Permissions} = require('discord.js')

module.exports = {
  name: "steal",
  description: "Steals Emojis",
  usage: "steal <Emoji> [name]",
  aliases: ["stealemoji"],
  cooldown: 0,
  run: async (client, message, args) => {
    if(!message.member.permission.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS)) return message.channel.send({content: `${emojis.wrong} You need the \`MANAGE_EMOJIS\` permission to use this command!`})

    const emoji = args[0];
    const name = args.slice(1).join(" ");
    if (!emoji) return message.channel.send({content: `${emojis.wrong} Please mention an emoji!`})

    try {
      if (emoji.startsWith("https://cdn.discordapp.com")) {
        await message.guild.emojis.create(emoji, name || "give_name");

        const embed = new MessageEmbed()
          .setAuthor(`New Emoji Added!`, 'https://cdn.discordapp.com/emojis/798779186801803264.gif?v=1')
          .setThumbnail(`${emoji}`)
          .setColor('#A6FE00')
          .setDescription(
            `Emoji Has Been Added! | Name: ${
              name || "give_name"
            } `
          );
        return message.channel.send({embeds: [embed]});
      }

      const customEmoji = Util.parseEmoji(emoji);

      if (customEmoji.id) {
        const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${customEmoji.animated ? "gif" : "png"
          }`;

        await message.guild.emojis.create(
          `${link}`,
          `${name || `${customEmoji.name}`}`
        );
       
        const embed = new MessageEmbed()
          .setTitle(`Emoji Added <:${customEmoji.name}:${customEmoji.id}>`)
          .setColor('#A6FE00')
          .setThumbnail(`${link}`)
          .setDescription(
            `Emoji Has Been Added! | Name: ${name || `${customEmoji.name}`
            } | Preview: [Click me](${link})`
          );
        return message.channel.send({ embeds: [embed] });
      } else {
        const foundEmoji = parse(emoji, { assetType: "png" });
        if (!foundEmoji[0]) return message.channel.send({ content: `${emojis.wrong} The emoji you provided isn't valid!` })
        message.channel.send({content: `${emojis.wrong} This is a default emoji!`})
      }
    } catch (e) {
      if (
        String(e).includes(
          "DiscordAPIError: Maximum number of emojis reached (50)"
        )
      ) return message.channel.send({content: `${emojis.wrong} This server has reached the maximum emoji limit!`})
    }
  },
};
