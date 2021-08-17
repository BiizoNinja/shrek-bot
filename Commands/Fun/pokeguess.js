const { MessageEmbed } = require("discord.js");
const { Spawn } = require("pokecord");

module.exports = {
  name: "pokeguess",
  description: "Play a game of `Guess The Pokemon`!",
  usage: "pokeguess",
  aliases: ["guessthepokemon"],
  cooldown: 0,
  run: async (client, message, args) => {
    const pokemon = await Spawn().catch((e) => {});
    if (!pokemon) return message.channel.send({content: `<:wrong:856162786319925270> Something went wrong while fetching the pokemon!`});
    const filter = (m) => m.author.id === message.author.id;

    const embed = new MessageEmbed()
      .setTitle("Guess the pokemon")
      .setColor("RANDOM")
      .setImage(pokemon.imageURL)
      .setFooter(
        `Requested by: ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    await message.channel.send(embed);

    try {
      let collected = await message.channel.awaitMessages(filter, {
        max: 1,
        error: ["time"],
        time: 15000,
      });
      const m = collected.first();
      if (!m.content || m.content.toLowerCase() !== pokemon.name.toLowerCase())
        return message.channel.send(
          `❌ | Incorrect guess The answer was **${pokemon.name}**.`
        );
      return message.channel.send(`✅ | Correct guess`);
    } catch (err) {
      message.channel.send(
        `❌ | You did not answer in time. The correct answer was **${pokemon.name}**!`
      );
    }
  },
};
