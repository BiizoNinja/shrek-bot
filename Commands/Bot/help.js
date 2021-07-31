const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const { readdirSync } = require("fs");

module.exports = {
name: "help",
usage: 'help [Command/Category]',
description: "Shows all available bot commands",
run: async (client, message, args) => {
  if (!args[0]) {
    let categories = [];
    const diremojis = {
      Fun: "🎲",
      Moderation: "🔨",
      Bot: "🤖",
      Utility: "⛏️",
      Text: "✍",
      Config: "⚙"
    }
    readdirSync("./Commands/").forEach((dir) => {
      const editedname = `${diremojis[dir]} - ${dir}`
      if (dir.toLowerCase() === 'pvt-cmds') return;
      let data = new Object();
      data = {
        name: editedname,
        value: `\`.help ${dir.toLowerCase()}\``,
        inline: true
      };
      categories.push(data);
    });
    const embed = new MessageEmbed()
      .setAuthor(`Help - Shrekbot`, client.user.displayAvatarURL({dynamic: true}))
      .setColor('#A6FE00')
      .addFields(categories)
      .setDescription(`For more information do \`.help [Category/Command]\`\n\n **__Catergories__**`)
      .setTimestamp()
      .addFields(
        {name: "\u200c", value: "\u200c"},
        { name: "\u200c", value: ("<:addSymbol:870284681218768906> [Invite](https://dsc.gg/shrekbot) `|` <a:arrowGreenRight:854009847140843541> [Support Server](https://discord.gg/V9DHGNtuUe) `|` <:topggVote:870285376252674098> [Vote](https://top.gg/bot/855803758645870613)"), inline: true },
      )
    return message.channel.send(embed);
  } else if (args[0].toLowerCase() === 'moderation') {
    const commandList = [];
    readdirSync(`./Commands/Moderation`).forEach((file) => {
      const pull = require(`../../Commands/Moderation/${file}`);
      const name = `\`${pull.name}\``
      commandList.push(name);
    })
    return message.channel.send(new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":hammer: - **Moderation Commands**"))
  } else if (args[0].toLowerCase() === 'utility') {
    const commandList = [];
    readdirSync(`./Commands/Utility`).forEach((file) => {
      const pull = require(`../../Commands/Utility/${file}`);
      const name = `\`${pull.name}\``
      commandList.push(name);
    })
    return message.channel.send(new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle("⛏️ - **Utility Commands**"))
  } else if (args[0].toLowerCase() === 'bot') {
    const commandList = [];
    readdirSync(`./Commands/Bot`).forEach((file) => {
      const pull = require(`../../Commands/Bot/${file}`);
      const name = `\`${pull.name}\``
      commandList.push(name);
    })
    return message.channel.send(new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":robot: - **Bot Related Commands**"))
  } else if (args[0].toLowerCase() === 'config') {
    const commandList = [];
    readdirSync(`./Commands/Config`).forEach((file) => {
      const pull = require(`../../Commands/Config/${file}`);
      const name = `\`${pull.name}\``
      commandList.push(name);
    })
    return message.channel.send(new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":gear: - **Config Commands**"))
  } else if (args[0].toLowerCase() === 'fun') {
    const commandList = [];
    readdirSync(`./Commands/Fun`).forEach((file) => {
      const pull = require(`../../Commands/Fun/${file}`);
      const name = `\`${pull.name}\``
      commandList.push(name);
    })
    return message.channel.send(new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(":game_die: - **Fun Commands**"))
  } else if(args[0].toLowerCase() === 'text') {
    const commandList = [];
    readdirSync(`./Commands/Text`).forEach((file) => {
      const pull = require(`../../Commands/Text/${file}`);
      const name = `\`${pull.name}\``
      commandList.push(name);
    }); 
  return message.channel.send(new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(" :writing_hand: - **Text Commands**"))
   } else if(args[0].toLowerCase() === 'image') {
    const commandList = [];
    readdirSync(`./Commands/Image`).forEach((file) => {
      const pull = require(`../../Commands/Image/${file}`);
      const name = `\`${pull.name}\``
      commandList.push(name);
    }); 
  return message.channel.send(new MessageEmbed().setDescription('To get more Info on a Command, Do `.help <command name>`\n\n' + commandList.map((data) => `${data}`).join(", ")).setTimestamp().setColor('#A6FE00').setTitle(" :frame_photo: - **Text Commands**"))  
} else {
    const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
    if (!command) {
      message.channel.send(`There isn't any command or category named "${args[0]}"`)
    } else {
      let command = client.commands.get(args[0].toLowerCase()) || client.commads.find((c) => c.aliases.includes(args[0].toLowerCase()))
      let name = command.name;
      let description = command.description || "No descrpition provided"
      let usage = command.usage || "No usage provided"
      let aliases = command.aliases || "No aliases provided"
      let cooldown = command.cooldown || "No cooldown provided!"

      let cooldownEmbed = new Discord.MessageEmbed()
      .setAuthor(`Requested from ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
      .setTitle(`Help - ShrekBot, ${(name.toLocaleString())} Command!`) 
      .setDescription(`> **Here is some info about the command!**\n> Note: If the field has \`< >\` then it is a **required** field. But if the field has \`[ ]\` then it is an **optional** field.\n`)
      .addFields(
        {name: "📋 Description" , value: `${description}`},
        {name: "⌨️ Usage", value: `${usage}`},
        {name: "📎 Aliases" , value: `${aliases}`},
        {name: '⏱️ Cooldown', value: `${ms(cooldown)}`}
      )
      .setColor(message.guild.me.displayHexColor)
      message.channel.send(cooldownEmbed)

      if(!cooldown) {
        let nocdEmbed = new Discord.MessageEmbed()
        .setAuthor(`Requested from ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .setTitle(`Help - ShrekBot, ${(name.toLocaleString())} Command!`) 
        .setDescription(`> **Here is some info about the command!**\n> Note: If the field has \`< >\` then it is a **required** field. But if the field has \`[ ]\` then it is an **optional** field.\n`)
        .addFields(
          {name: "📋 Description" , value: `${description}`},
          {name: "⌨️ Usage", value: `${usage}`},
          {name: "📎 Aliases" , value: `${aliases}`},
          {name: '⏱️ Cooldown', value: `None`}
        )
        .setColor(message.guild.me.displayHexColor)
        message.channel.send(nocdEmbed)
      }; 
    }
  }
},
}; 