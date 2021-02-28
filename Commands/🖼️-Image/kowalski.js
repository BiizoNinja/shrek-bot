const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "kowalski",
    description: "Make a Kowalski Meme",
    usage:'s!kowalski <text>',
    run: async (client, message, args) => {
        
        let mention;

        if(!args.length) return message.channel.send(' Usage: -kowalski <anything you want to say>');

        try {
            const text = args.join(' ')
            const url = `https://chilledcoders.ml/kowalski?text=`
            const encoded = url + encodeURIComponent(text);
            
            const embed = new MessageEmbed()
                .setImage(encoded)
            await message.channel.send(embed)
        } catch (e) {
            console.log(e)
        }

    }
}