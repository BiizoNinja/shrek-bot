const Discord = require("discord.js");
const schema = require("../../models/cr-schema");
const crUserSchema = require("../../models/crUserSchema");
const { emojis, colors } = require(`../../assets.json`)
const {Permissions} = require('discord.js')

module.exports = {
  name: "customrole",
  description: "A complete Customrole system! with settings and caching! ",
  usage: "customrole [create | settings | cache | help | delete]",
  aliases: ["cr"],
  cooldown: 0,
  run: async (client, message, args) => {
    const settings = args[0];
    if (!settings)
      return message.channel.send({ content:
        `${emojis.wrong} You need to specify an option! \`.customrole <create | settings | cache | help | delete>\``
      });

    const crData = await schema.findOne({
      GuildID: message.guild.id,
    });

    const crUserData = await crUserSchema.findOne({
      UserID: message.author.id,
      GuildID: message.guild.id,
    });

    if (settings.toLowerCase() == "cache") {
      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
        return message.channel.send({content: 
          `${emojis.wrong} You need the \`ADMINISTRATOR\` permission to use this! `
        });
      if (crData)
        return message.channel.send({content:
          "Hey! Looks like this server is already cached in the database!"
        });

      if (!crData) {
        const msg = await message.channel.send({content:
          "**Caching this server (adding this server to the database!)** <a:blueLoading:856159438024605709>"
        });
        setTimeout(() => {
          msg.edit({content:
            `${emojis.success} Added this server! You can change the settings by running \`.customrole settings\``
          });
        }, 3000);

        await new schema({
          GuildID: message.guild.id,
          MaxPos: 1,
          AllowedRole: "None",
        }).save();
      }
    }

    if (settings.toLowerCase() == "settings") {
      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
        return message.channel.send(
          `${emojis.wrong} You need the \`ADMINISTRATOR\` permission to use this! `
        );
      if (!crData)
        return message.channel.send(
          `${emojis.wrong} This server is not cached in the database! Please run \`.customrole cache\` to cache it!`
        );

      const setting = args[1];

      if (!setting) {
        if (crData.AllowedRole == "None") {
          const settingsEmbed = new Discord.MessageEmbed()
            .setAuthor(
              `${message.guild.name} - Settings - Custom Role`,
              message.guild.iconURL({ dynamic: true })
            )
            .setDescription(
              `You can do \`.customrole settings <Setting> <value>\` to change!`
            )
            .addFields(
              {
                name: "Role Position",
                value: `» Role Position: ${crData.MaxPos}`,
              },
              { name: "Allowed Role", value: `» ${emojis.wrong} - None` }
            )
            .setFooter("beep boop bap")
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);

          message.channel.send({embeds: [settingsEmbed]});
        } else {
          const settingsEmbed1 = new Discord.MessageEmbed()
            .setAuthor(
              `${message.guild.name} - Settings - Custom Role`,
              message.guild.iconURL({ dynamic: true })
            )
            .setDescription(
              `You can do \`.customrole settings <Setting> <value>\` to change!`
            )
            .addFields(
              {
                name: "Role Position",
                value: `» Maximum Role Position: ${crData.MaxPos}`,
              },
              { name: "Allowed Role", value: `» <@&${crData.AllowedRole}>` }
            )
            .setFooter("beep boop bap")
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
          message.channel.send({embeds: [settingsEmbed1]});
        }
      }

      if (setting == "SetPos" || setting == "SetPosition") {
        const MaxPosValue = parseInt(args[2]);
        if (!MaxPosValue)
          return message.channel.send({
            content:
              `${emojis.wrong} You need to provide a value to change!`
          });
        if (isNaN(MaxPosValue))
          return message.channel.send({
            content:
              `${emojis.wrong} You need to provide a value that is a NUMBER for your role.`
          });

        await schema.findOneAndUpdate(
          {
            GuildID: message.guild.id,
          },
          {
            GuildID: message.guild.id,
            MaxPos: MaxPosValue,
          }
        );

        message.channel.send({content: 
          `${emojis.success} Updated the role position to "${MaxPosValue}"`
        });
      }

      if (
        setting == "AllowedRole" ||
        setting == "Role" ||
        setting == "UsableRole" ||
        setting == "UseRole"
      ) {
        const role = message.guild.roles.cache.get(args[2]);
        if (!role)
          return message.channel.send({
            content:
              `${emojis.wrong} Please provide a valid role id!`
          });

        await schema.findOneAndUpdate(
          {
            GuildID: message.guild.id,
          },
          {
            GuildID: message.guild.id,
            AllowedRole: role.id,
          }
        );
        message.channel.send({content:
          `${emojis.success} Updated the allowed role to "**${role.name}**"`
        });
      }
    }

    if (settings.toLowerCase() == "create") {
      if (!crData)
        return message.channel.send({
          content:
            `${emojis.wrong} This server is not cached in the database! Please run \`.customrole cache\` to cache it!`
        });

      if (!crUserData) {
        const AllowedRole = message.guild.roles.cache.get(
          `${crData.AllowedRole}`
        );
        if (!message.member.roles.cache.has(AllowedRole.id))
          return message.channel.send({content: 
            `${emojis.wrong} You must have the \`@${AllowedRole.name}\` role to edit custom roles!`
          });

        const name = args.slice(2).join(" ");
        if (!name)
          return message.channel.send({
            content:
              `${emojis.wrong} Please provide a name for your role!`
          });

        const color = args[1];
        if (!color)
          return message.channel.send({
            content:
              `${emojis.wrong} Please provide a color for your role!`
          });

        const reg = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
        const match = color.match(reg);
        if (!match)
          return message.channel.send({content: 
            `${emojis.wrong} Please provide a valid hex code! Make sure to use \`#\` at the beginning`
          });

        let role = await message.guild.roles.create(
        {   name: name,
            color: color,
            hoist: false,
            position: crData.MaxPos - 1,
        });
        message.member.roles.add(role);
        message.channel.send({
          content:
            `${emojis.success} I have made your custom role and have added it to you!`
        });

        await new crUserSchema({
          UserID: message.author.id,
          GuildID: message.guild.id,
          CustomRole: role.id,
        }).save();
      }

      if (crUserData) {
        message.channel.send({
          content:
            `<:wrong:856162786319925270> You already have a customrole! Run \`.customrole delete\` to delete it!`
        });
      }
    }

    if (settings.toLowerCase() == "delete") {
      if (!crData)
        return message.channel.send({
          content:
            `${emojis.wrong} This server is not cached in the database! Please run \`.customrole cache\` to cache it!`
        });

      const AllowedRole = message.guild.roles.cache.get(
        `${crData.AllowedRole}`
      );
      if (!message.member.roles.cache.has(AllowedRole.id))
        return message.channel.send({
          content:
            `${emojis.wrong}> You must have the \`@${AllowedRole.name}\` role to edit custom roles!`
        });

      if (!crUserData)
        return message.channel.send({
          content:
            `${emojis.wrong} You don't have a custom role! Run \`.customrole create <Color> <name>\` to create one!`
        });

      message.guild.roles.cache.get(crUserData.CustomRole).delete();
      await crUserData.delete();
      message.channel.send({
        content:
          `${emojis.success} I have deleted your customrole!`
      });
    }

    if (settings.toLowerCase() == "help") {
      const { pagination } = require("reconlx");

      const embed1 = new Discord.MessageEmbed()
        .setAuthor(
          `Help - Customrole`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "Custom Roles are a way to reward your server members! You can set up custom roles in your server using ShrekBot! If you have more questions feel free to ask in the [Support Server](https://discord.gg/V9DHGNtuUe)"
        )
        .addFields(
          {
            name: "Caching",
            value:
              "Before you can use ANY of the commands you need to cache your server! (add your server to our database) Administrators can do this by running `.customrole cache`.",
          },
          {
            name: "View Settings",
            value:
              "Admins can view the server settings by running the command `.customrole settings`",
          }
        )
        .setColor("#A6FE00")
        .setFooter("1")

      const embed2 = new Discord.MessageEmbed()
        .setAuthor(
          `Help - Customrole`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "Custom Roles are a way to reward your server members! You can set up custom roles in your server using ShrekBot! If you have more questions feel free to ask in the [Support Server](https://discord.gg/V9DHGNtuUe)"
        )
        .addFields(
          {
            name: "Max Position",
            value:
              "This is the position where the role will appear, role positions go from bottom to top in the role list! To set this you can do `The role you want to go above position + 2` For example: Server Booster role position is 12 so the command will be `.cr settings MaxPos 14`(12 + 2)\nAdmins can set position by running `.customrole settings SetPos <Position>`",
          },
          {
            name: "Allowed Role",
            value:
              "This determins weather a user should have a specific role to create custom roles!\nAdmins can change bu using the command `.customrole settings AllowedRole <RoleID>`",
          },
          {
            name: "Creating/Deleting/Editing Custom Roles",
            value:
              "People with the allowed role can create their roles by running `.customrole create <HexColor> <RoleName>` Make sure to use `#` at the beginning for the hex code.",
          }
        )
        .setColor("#A6FE00");

      const pages = [embed1, embed2];

      pagination({
        embeds: pages,
        message: message,
        time: 1000 * 60 * 2,
      })
    }
  },
};
