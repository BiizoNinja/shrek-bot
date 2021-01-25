const { MessageEmbed } = require("discord.js");
const { Spawn } = require("pokecord");
 
module.exports  = {
    name: 'pokeguess',
    description: 'Play a game of `Guess The Pokemon`!',
    usage: 's!pokeguess',
    aliases: ["guessthepokemon"],
    execute: async(Client, message, args) => {

    const pokemon = await Spawn().catch(e => {});
    if (!pokemon) return message.channel.send("Opps! Something went wrong :(");
    const filter = m => m.author.id === message.author.id;
 
    const embed = new MessageEmbed()
        .setTitle("Guess the pokemon <a:charmander_vibe:801454612154023937>")
        .setColor("RANDOM")
        .setImage(pokemon.imageURL)
        .setFooter(`Requested by: ${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
    
    await message.channel.send(embed);
 
    message.channel.awaitMessages(filter, {
        max: 1,
        error: ["time"],
        time: 15000
    })
    .then(collected => {
        const m = collected.first();
        if (!m.content || m.content.toLowerCase() !== pokemon.name.toLowerCase()) return message.channel.send(`<a:XMARK:801450921112371232> | Incorrect guess! The answer was **${pokemon.name}**.`);
        return message.channel.send(`<a:TICK:801450801200758795> | Correct guess!`);
    })
    .catch(() => {
        message.channel.send(`❌ | You did not answer in time. The correct answer was **${pokemon.name}**!`);
    });
 
    }
    

} 
   