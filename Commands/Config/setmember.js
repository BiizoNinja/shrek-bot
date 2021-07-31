const Discord = require("discord.js");
const schema = require("../../models/memberRole");

module.exports = {
  name: "setmember",
  description:
    "Set's the member role! if the server isn't using @everyone as their main role",
  usage: "setmember <role>",
  aliases: ["setmain"],
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send(
        "<:wrong:856162786319925270> You need the `ADMINISTRATOR` permission to use this!"
      );
    const data = await schema.findOne({
      GuildID: message.guild.id,
    });

    const role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role)
      return message.channel.send(
        "<:wrong:856162786319925270> You need to specify a role!"
      );

    if (data) {
      schema.findOneAndUpdate(
        {
          GuildID: message.guild.id,
        },
        {
          MemberRole: role.id,
        }
      );
      message.channel.send(
        `<:greenTick:854228019312066571> Successfully set the Member role to **${role.name}**`
      );
    }

    if (!data) {
      new schema({
        GuildID: message.guild.id,
        MemberRole: role.id,
      }).save();
      message.channel.send(
        `<:greenTick:854228019312066571> Successfully set the Member role to **${role.name}**`
      );
    }
  },
};
