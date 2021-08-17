const Discord = require("discord.js");

module.exports = {
  name: "hack",
  description: "hack a user (fake)",
  cooldown: 0,
  run: async (client, message, args) => {
    const eMails = [
      "epicgamer@pogmail.com",
      "sugon.deez@nuts.com",
      "nevergonnagive@you.up",
      "animegirls@weirdo.au",
      "orangutan@pog.com",
      "amogus@sus.red",
      "lookin.thick@pogmail.com",
    ];
    const emailRandom = Math.floor(Math.random() * eMails.length);

    const password =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    const taggedUser = message.mentions.users.first();
    if (!taggedUser) {
      return message.channel.send("Please mention somebody to hack!");
    }
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${taggedUser.tag} got hacked!`,
        taggedUser.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `**__Found Info!__**\n> Emails: ${eMails[emailRandom]}\n> Password: ${password}\n`
      )
      .setColor(message.guild.me.displayHexColor)
      .setFooter("totally real!1!!1!");

    message.channel.send({content: `Hacking  **${taggedUser.tag}**...`});

    const fMsg = await message.channel.send({
      content:
        `Successfully hacked **${taggedUser.tag}**! Fetching Information... <a:blueLoading:856159438024605709>`
    });
    setTimeout(() => {
      fMsg.edit({ content: "Information found" , embeds: [embed]});
    }, 5000);
  },
};
