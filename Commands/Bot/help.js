const {
    MessageEmbed,
    Message,
    Client
} = require("discord.js");
const {
    readdirSync
} = require("fs");
const client = require('../../index')
const prefix = '.'; // this one gets the prefix
let color = "#A6FE00"; // this is the color of the embed

const create_mh = require(`../../functions/menu.js`); // this one gets the dropdown menu

module.exports = {
    name: "help",
    aliases: [`h`],
    emoji: `🚑`, // emoji next to the Command name i will show you in a min
    description: "Shows all available bot Commands",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args, Discord, db) => {

        let categories = [];
        let cots = [];

        if (!args[0]) {

            //categories to ignore
            let ignored = [
                "pvt-cmds"
            ];

            const emo = {

              Bot: ":robot:",
              Config: ":gear:",
              Utility: ":tools:",
              Moderation: ":hammer:",
              Image: ":frame_photo:",
              Text: ":writing_hand:",
              Tickets: ":ticket:",
              Fun: ":game_die:"

            }

            let ccate = [];
            //gets all the folders and commands
            readdirSync("./Commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const Commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                if (ignored.includes(dir.toLowerCase())) return;

                const name = `${emo[dir]} - ${dir}`;
                let nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
                //let nome = dir.toUpperCase();

                let cats = new Object();

                //this is how it will be created as
                cats = {
                    name: name,
                    value: `\`${prefix}help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats);
                ccate.push(nome);
            });
            //embed
            const embed = new MessageEmbed()
                .setTitle(`Bot Commands`)
                .setDescription(`>>> My prefix is \`${prefix}\`\nUse the menu, or use \`${prefix}help [category]\` to view Commands base on their category!`)
                .addFields(categories)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color)


//creating the dropdown menu
            let menus = create_mh(ccate);
            return message.reply({
                embeds: [embed],
                components: menus.smenu
            }).then((msgg) => {

                const menuID = menus.sid;

                const select = async (interaction) => {
                    if (interaction.customId != menuID) return;

                    let {
                        values
                    } = interaction;

                    let value = values[0];

                    let catts = [];

                    readdirSync("./Commands/").forEach((dir) => {
                        if (dir.toLowerCase() !== value.toLowerCase()) return;
                        const Commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
                            file.endsWith(".js")
                        );


                        const cmds = Commands.map((Command) => {
                            let file = require(`../../Commands/${dir}/${Command}`); //getting the Commands again

                            if (!file.name) return "No Command name.";

                            let name = file.name.replace(".js", "");

                            if (client.commands.get(name).hidden) return;


                            let des = client.commands.get(name).description;
                            let emo = client.commands.get(name).emoji;
                            let emoe = emo ? `${emo} - ` : ``;

                            let obj = {
                                cname: `${emoe}\`${name}\``,
                                des
                            }

                            return obj;
                        });

                        let dota = new Object();

                        cmds.map(co => {
                            if (co == undefined) return;

                            dota = {
                                name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                                value: co.des ? co.des : `No Description`,
                                inline: true,
                            }
                            catts.push(dota)
                        });

                        cots.push(dir.toLowerCase());
                    });

                    if (cots.includes(value.toLowerCase())) {
                        const combed = new MessageEmbed()
                            .setTitle(`__${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`)
                            .setDescription(`Use \`${prefix}help\` followed by a Command name to get more information on a Command.\nFor example: \`${prefix}help ping\`.\n\n`)
                            .addFields(catts)
                            .setColor(color)

                        await interaction.deferUpdate();

                        return interaction.message.edit({
                            embeds: [combed],
                            components: menus.smenu
                        })
                    };

                };

                const filter = (interaction) => {
                    return !interaction.user.bot && interaction.user.id == message.author.id
                };

                const collector = msgg.createMessageComponentCollector({
                    filter,
                    componentType: "SELECT_MENU"
                });
                collector.on("collect", select);
                collector.on("end", () => null);

            });

        } else {
            let catts = [];

            readdirSync("./Commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const Commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = Commands.map((Command) => {
                    let file = require(`../../Commands/${dir}/${Command}`);

                    if (!file.name) return "No Command name.";

                    let name = file.name.replace(".js", "");

                    if (client.Commands.get(name).hidden) return;


                    let des = client.Commands.get(name).description;
                    let emo = client.Commands.get(name).emoji;
                    let emoe = emo ? `${emo} - ` : ``;

                    let obj = {
                        cname: `${prefix}${emoe}\`${name}\``,
                        des
                    }

                    return obj;
                });

                let dota = new Object();

                cmds.map(co => {
                    if (co == undefined) return;

                    dota = {
                        name: prefix + `${cmds.length === 0 ? "In progress." : prefix + co.cname}`,
                        value: co.des ? co.des : `No Description`,
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            const Command =
                client.Commands.get(args[0].toLowerCase()) ||
                client.Commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new MessageEmbed()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Use \`${prefix}help\` followed by a Command name to get more information on a Command.\nFor example: \`${prefix}help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return message.reply({
                    embeds: [combed]
                })
            };

            if (!Command) {
                const embed = new MessageEmbed()
                    .setTitle(`Invalid Command! Use \`${prefix}help\` for all of my Commands!`)
                    .setColor("RED");
                return await message.reply({
                    embeds: [embed],
                    allowedMentions: {
                        repliedUser: false
                    },
                });
            }

            const embed = new MessageEmbed() //this is for commmand help eg. !!help ping
                .setTitle("Command Details:")
                .addField(
                    "Command:",
                    Command.name ? `\`${Command.name}\`` : "No name for this Command."
                )
                .addField(
                    "Aliases:",
                    Command.aliases ?
                    `\`${Command.aliases.join("` `")}\`` :
                    "No aliases for this Command."
                )
                .addField(
                    "Usage:",
                    Command.usage ?
                    `\`${prefix}${Command.name} ${Command.usage}\`` :
                    `\`${prefix}${Command.name}\``
                )
                .addField(
                    "Command Description:",
                    Command.description ?
                    Command.description :
                    "No description for this Command."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);
            return await message.reply({
                embeds: [embed]

            });
        }
    },
}; 