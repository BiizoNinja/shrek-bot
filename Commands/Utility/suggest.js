const Discord = require("discord.js");
const suggestSchema = require('../../models/sugSettings-schema')
const sugServerSchema = require('../../models/sugServer-schema')
const codegen = require('random-code-gen')

module.exports = {
  name: "suggest",
  description: "suggest something to the server",
  usage: "suggest <suggestion>",
  run: async (client, message, args) => {

    const settings = await suggestSchema.findOne({
      GuildID: message.guild.id
    });

    if (!settings) return message.channel.send({content: `<:wrong:856162786319925270> This server doesn\'t have settings enabled.\nAny admin can run \`.setup-suggestions\` to enable it.`})

    const suggestionID = codegen.random(7)
    const suggestChannel = message.guild.channels.cache.get(settings.SuggestionChannel)

    const suggestion = args.slice(0).join(' ')
    if (!suggestion) return message.channel.send({content: `<:wrong:856162786319925270> Please add a suggestion`})
    if (suggestion.includes('@everyone')) return message.channel.send({content:`<:wrong:856162786319925270> You aren\'t allowed to ping everyone!` })
    if (suggestion.includes('@here')) return message.channel.send({content: `<:wrong:856162786319925270> You aren\'t allowed to ping everyone!`})
    if (suggestion.includes('https://')) return message.channel.send({content: `<:wrong:856162786319925270> You aren\'t allowed to add links to suggestions!`})
    if (suggestion.includes('discord.gg') || suggestion.includes('dsc.gg') || suggestion.includes('discord.io') || suggestion.includes('top.gg')) return message.channel.send({content: `<:wrong:856162786319925270> You aren\'t allowed to advertise in suggestions!`})

    const serverData = await sugServerSchema.findOne({
      GuildID: message.guild.id
    });

    if (!serverData) {
      await new sugServerSchema({
        GuildID: message.guild.id,
        SuggestID: suggestionID,
        Suggestion: suggestion,
        Suggestor: message.author.id
      }).save();

      message.channel.send({content: '<:greenTick:854228019312066571> Added your suggestion!'})

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Suggestion - ${message.author.tag}`, message.author.displayAvatarURL({
          dynamic: true
        }))
        .setDescription(suggestion)
        .setFooter(`Suggestion ID: ${suggestionID}`)
        .setColor(message.guild.me.displayHexColor)
      suggestChannel.send({embeds: [embed]})
    }

    if (serverData) {
      await new sugServerSchema({
        GuildID: message.guild.id,
        SuggestID: suggestionID,
        Suggestion: suggestion,
        Suggestor: message.author.id
      }).save();
      message.channel.send({content: '<:greenTick:854228019312066571> Added your suggestion!'})

      const embed = new Discord.MessageEmbed()
        .setAuthor(`Suggestion - ${message.author.tag}`, message.author.displayAvatarURL({
          dynamic: true
        }))
        .setDescription(suggestion)
        .setFooter(`Suggestion ID: ${suggestionID}`)
        .setColor(message.guild.me.displayHexColor)
      suggestChannel.send({embeds: [embed]})

    }

  }
};