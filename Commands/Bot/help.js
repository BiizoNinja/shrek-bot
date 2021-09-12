const { MessageEmbed, Message, Client, MessageActionRow, MessageButton } = require("discord.js");
const Discord = require('discord.js')
const {readdirSync} = require("fs");
const ms = require('ms')


module.exports = {
    name: "help",
    aliases: [`h`],
    description: "Shows all available bot Commands",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {

        if (!args[0]) {

            const emo = {
                Bot: "🤖",
                Config: "⚙",
                Utility: "🛠",
                Moderation: "🔨",
                Image: "🖼",
                Text: "✍",
                Fun: "🎲"
            }
            const categories = []
            readdirSync("./Commands/").forEach((dir) => {
                const editedname = `${emo[dir]} - ${dir}`
                if (dir.toLowerCase() === 'pvt-cmds') return;
                let data = new Object();
                data = {
                    name: editedname,
                    value: `Click on the **${dir}** Button`,
                    inline: true
                };
                categories.push(data);
            });

            let disabled = null
            disabled = false;
            
            const botBtn = new MessageButton()
                .setCustomId('help-bot')
                .setLabel('Bot')
                .setEmoji(emo.Bot)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const configBtn = new MessageButton()
                .setCustomId('help-config')
                .setLabel('Config')
                .setEmoji(emo.Config)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const utilBtn = new MessageButton()
                .setCustomId('help-util')
                .setLabel('Utility')
                .setEmoji(emo.Utility)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const modBtn = new MessageButton()
                .setCustomId('help-mod')
                .setLabel('Moderation')
                .setEmoji(emo.Moderation)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const imgBtn = new MessageButton()
                .setCustomId('help-img')
                .setLabel('Image')
                .setEmoji(emo.Image)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const textBtn = new MessageButton()
                .setCustomId('help-text')
                .setLabel('Text')
                .setEmoji(emo.Text)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const funBtn = new MessageButton()
                .setCustomId('help-fun')
                .setLabel('Fun')
                .setEmoji(emo.Fun)
                .setDisabled(disabled)
                .setStyle('SUCCESS')
            
            const row1 = new MessageActionRow()
                .addComponents(botBtn)
                .addComponents(configBtn)
                .addComponents(utilBtn)
                .addComponents(modBtn)
                .addComponents(imgBtn)

            const row2 = new MessageActionRow()
                .addComponents(textBtn)
                .addComponents(funBtn)
            
            const embed = new MessageEmbed()
                .setAuthor(`Help - Shrekbot`, client.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Here is a list of all the commands avalable on the bot. You can run \`.help <Command_name>\` to see more info about the command!\n**Total Commands:** ${client.commands.size}\n\u200c`)
                .setColor('#A6FE00')
                .addFields(categories)
                .setTimestamp()
                .addFields(
                    { name: '\u200c', value: '\u200c' }, 
                    { name: "\u200c", value: ("<:addSymbol:870284681218768906> [Invite](https://dsc.gg/shrekbot) `|` <a:arrowGreenRight:854009847140843541> [Support Server](https://discord.gg/V9DHGNtuUe) `|` <:topggVote:870285376252674098> [Vote](https://top.gg/bot/855803758645870613)"), inline: true },
                )
            const fMsg = await message.channel.send({ embeds: [embed], components: [row1, row2] });

            const filter = (interaction) => {
                if (interaction.user.id === message.author.id) return true;
                return interaction.reply({ content: `This is not your button!`, ephemeral: true })
            }
            
            const collector = message.channel.createMessageComponentCollector({
                filter,
                max: 4,
                time: 5000
            });
            
            collector.on('collect', async (interaction) => {
                interaction.deferUpdate();
                
                if (interaction.customId == 'help-bot') {
                    const commandList = [];
                    readdirSync(`./Commands/Bot`).forEach((file) => {
                        const pull = require(`../../Commands/Bot/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":robot: - **Bot Related Commands**")
                    fMsg.edit({ embeds: [embed] })
                };

                if (interaction.customId == 'help-config') {
                    const commandList = [];
                    readdirSync(`./Commands/Config`).forEach((file) => {
                        const pull = require(`../../Commands/Config/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":gear: - **Config Commands**")
                    fMsg.edit({ embeds: [embed] })
                };

                if (interaction.customId == 'help-fun') {
                    const commandList = [];
                    readdirSync(`./Commands/Fun`).forEach((file) => {
                        const pull = require(`../../Commands/Fun/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":game_die: - **Fun Commands**")
                    fMsg.edit({ embeds: [embed] })
                };

                if (interaction.customId == 'help-img') {
                    const commandList = [];
                    readdirSync(`./Commands/Image`).forEach((file) => {
                        const pull = require(`../../Commands/Image/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":frame_photo: - Image Commands")
                    fMsg.edit({ embeds: [embed] })
                };

                if (interaction.customId == 'help-mod') {
                    const commandList = [];
                    readdirSync(`./Commands/Moderation`).forEach((file) => {
                        const pull = require(`../../Commands/Moderation/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":hammer: - Moderation Commands")
                    fMsg.edit({ embeds: [embed] })
                };
            
                if (interaction.customId == 'help-mod') {
                    const commandList = [];
                    readdirSync(`./Commands/Moderation`).forEach((file) => {
                        const pull = require(`../../Commands/Moderation/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":hammer: - Moderation Commands")
                    fMsg.edit({ embeds: [embed] })
                };
                
                if (interaction.customId == 'help-text') {
                    const commandList = [];
                    readdirSync(`./Commands/Text`).forEach((file) => {
                        const pull = require(`../../Commands/Text/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":writing_hand: - Text Commands")
                    fMsg.edit({ embeds: [embed] })
                };
            
                if (interaction.customId == 'help-util') {
                    const commandList = [];
                    readdirSync(`./Commands/Utility`).forEach((file) => {
                        const pull = require(`../../Commands/Utility/${file}`);
                        const name = `\`${pull.name}\``
                        commandList.push(name);
                   
                    });
                    const embed = new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":gear: - Utility Commands")
                    fMsg.edit({ embeds: [embed] })
                };
            })

            collector.on('end', async () => {
                disabled = true
            });
            

        } else {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
            if (!command) {
                message.channel.send(`There isn't any command or category named "${args[0]}"`)
            } else {
                let command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
                let name = command.name;
                let description = command.description || "No descrpition provided"
                let usage = command.usage || "No usage provided"
                let aliases = command.aliases || "No aliases provided"
                let cooldown = command.cooldown || "No cooldown provided!"

                let cooldownEmbed = new Discord.MessageEmbed()
                    .setFooter(`Requested from ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle(`Help - ShrekBot | \`${(name.toLocaleString())}\` Command!`)
                    .setDescription(`> **Here is some info about the command!**\n> Note: If the field has \`< >\` then it is a **required** field. But if the field has \`[ ]\` then it is an **optional** field.\n`)
                    .addFields(
                        { name: "📋 Description", value: `${description}` },
                        { name: "⌨️ Usage", value: `${usage}` },
                        { name: "📎 Aliases", value: `${aliases}` },
                        { name: '⏱️ Cooldown', value: `${ms(cooldown)}` }
                    )
                    .setColor(message.guild.me.displayHexColor)
                message.channel.send({embeds: [cooldownEmbed]})

                if (!cooldown) {
                    let nocdEmbed = new Discord.MessageEmbed()
                        .setFooter(`Requested from ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setTitle(`Help - ShrekBot | \`${(name.toLocaleString())}\` Command!`)
                        .setDescription(`> **Here is some info about the command!**\n> Note: If the field has \`< >\` then it is a **required** field. But if the field has \`[ ]\` then it is an **optional** field.\n`)
                        .addFields(
                            { name: "📋 Description", value: `${description}` },
                            { name: "⌨️ Usage", value: `${usage}` },
                            { name: "📎 Aliases", value: `${aliases}` },
                            { name: '⏱️ Cooldown', value: `None` }
                        )
                        .setColor(message.guild.me.displayHexColor)
                    message.channel.send({embeds: [nocdEmbed]})
                };
            }
        };
    }, 
};