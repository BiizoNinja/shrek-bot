const { MessageEmbed } = require('discord.js');

function generateEmbed(title, description, color, timestamp, fields, image, thumnail) {
    const embed = new MessageEmbed()
        .setColor(color);
    if (description !== false) embed.setDescription(description);
    if (title !== false) embed.setTitle(title);
    if (timestamp === true) embed.setTimestamp();
    if (fields !== false) embed.addFields(fields);
    if (image !== false) embed.setImage(image);
    if (thumnail !== false) embed.setThumbnail(thumnail);
    return embed;
}

function commandUsage(command) {
    return `**Aliases:** ${command.aliases || 'none'}\n**Description:** ${command.description}\n**Cooldown:** ${command.cooldown || 3}\n**Usage:** ${command.usage || 'none'}\n**Sub Commands:**\n${command.subcommands || 'none'}\n**Examples:**\n${command.examples || 'none'}`;
}

const inGame = [];

module.exports.generateEmbed = generateEmbed;
module.exports.commandUsage = commandUsage;
module.exports.inGame = inGame;