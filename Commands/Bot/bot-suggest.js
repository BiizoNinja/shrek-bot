const Discord = require("discord.js");

module.exports = {
    name: 'bot-suggest',
    description: 'Make a suggestion for the bot!',
    usage: 'bot-suggest <your suggestion>',
    cooldown: 0,
    run: async (client, message, args) => {
        const suggestchannel = client.channels.cache.find(channel => channel.id === "858710996436254730")
        if (!args[0]) return message.channel.send("Error! Please do: `.suggest <Your suggestion!>`")
        if (args.slice(0).join(' ').length > 1000) return message.channel.send('Too long, must be -1000 in length.')
        if (args.slice(0).join(' ').includes("discord.gg")) return message.channel.send("You cant suggest discord invites, do not try to advertise suggest, we will white list you,")
        if (args.slice(0).join(' ').includes("https")) return message.channel.send("You cant suggest links, do not try to advertise suggest, we will white list you,")
        if (args.slice(0).join(' ').includes("@everyone")) return message.channel.send("You cant mention in @ everyone in a suggestion")
        if (args.slice(0).join(' ').includes("@here")) return message.channel.send("You cant mention @ here in a suggesiton")



        const suggestembed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor("YELLOW")
            .setTitle('Suggestion!')
            .setDescription(`**Suggestion:** ${args.slice(0).join(' ')}\n`)
            .addField("**Status:**", "PENDING")
            .setTimestamp()
        suggestchannel.send(suggestembed).then(msg => {
            msg.react("<:upvote:858715588263280651>")
            msg.react("<a:downvote:858715482656210954>")
        })


        const suggestionadded = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle('Suggested!')
            .setDescription("Your suggestion got added in the [Support Server](https://discord.gg/V9DHGNtuUe)")
        message.channel.send(suggestionadded)

        async function reactEmojies(message, emojies) {
            for (const emoji of emojies) {
                await message.react(emoji);
            }
        }

    }
  }

