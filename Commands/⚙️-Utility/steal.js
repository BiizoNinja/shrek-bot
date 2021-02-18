const Discord = require('discord.js')
const { parse } = require('twemoji-parser')
module.exports = {
    name: 'steal',
    description: "Steals Emojis",
    usage: 's!steal <Emoji>',
    aliases: ['stealemoji'],
    execute: async (Client, message, args) => {

        if (!message.member.permissions.has("MANAGE_EMOJIS")) 
        return message.channel.send('<a:wrong:777910274011299850> Lack of Perms!');

        const emoji = args[0];
        if (!emoji) return message.channel.send(`Please provide an emoji to steal <:LONG_NOSE:810455970038677504>`);

        let customemoji = Discord.Util.parseEmoji(emoji);
        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"
                }`;
            const name = args.slice(1).join(" ");
            try {
                const Added = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle(` Emoji Added`)
                    .setDescription(
                        `Emoji Has Been Added! \nName : ${name || `${customemoji.name}`} \nPreview : [Click Me](${Link})`
                    );
                await message.guild.emojis.create(
                    `${Link}`,
                    `${name || `${customemoji}`}`
                )
                return message.channel.send(Added)
            } catch (err) {
                console.log(err)
                return message.channel.send(`An error has occured!\n\n**Possible Reasons:**\n\`\`\`- This server has reached the emojis limit\n- The bot doesn't have permissions.\n- The emojis size is too big.\`\`\``)

            }
        } else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0])
                return message.channel.send(`**Please Give Me A Valid Emoji!**`);
            message.channel.send(
                `**You Can Use Normal Emoji Without Adding In Server!**`
            );
        }
    }
}
    
