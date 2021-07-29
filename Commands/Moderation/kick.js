const Discord = require("discord.js");

module.exports = {
  name: "kick",
  description: "Kicks Users!",
  usage: "Kick <user> <reason>",
  cooldown: 0,
  cooldown: 0,
  run: async (client, message, args) => {
    const target = message.mentions.members.first();

    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.channel.send(
        " <:wrong:856162786319925270> You don't have the permission to do this! "
      );
    if (!target)
      return message.channel.send(
        `<:wrong:856162786319925270> Please specify a member to KICK.`
      );
    if (target == message.author)
      return message.channel.send(
        "<:wrong:856162786319925270> You can't KICK yourself! "
      );
    if (target == message.guild.owner)
      return message.channel.send(
        "<:wrong:856162786319925270> You can't KICK the owner! "
      );

    const reason = args.slice(1).join(" ");
    if (!reason)
      return message.channel.send(
        " <:wrong:856162786319925270> Please provide a reason to KICK!"
      );

    const targetMember = message.guild.members.cache.get(target.id);
    targetMember
      .KICK({
        days: 0,
        reason: `KICK Requested from ${message.author.tag}, Reason: ${reason}`,
      })
      .then(() => {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `Kicked **${target.tag}**, For the reason **${reason}**`
          )
          .setTimestamp()
          .setColor(`GREEN`);
        message.channel.send({ embeds: [embed] });
        target.send(
          `You have been Kicked from **${message.guild.name}**, From the moderator ${message.author.tag}(\`${message.author.tag}\`)`
        );
      });
  },
};
