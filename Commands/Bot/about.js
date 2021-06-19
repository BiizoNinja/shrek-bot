const Discord = require('discord.js');

module.exports = {
name: 'about',
description: 'about shrebot!',
usage: 'about',
run: async (client, message, args) => {

const embed = new Discord.MessageEmbed()
.setAuthor(`About - ShrekBot`)
.setDescription(`ShrekBot used to be a **verified** discord bot! But the idiot owner (me) decided to delete for some reason??? (prolly cause he smoked crack) So I've been thinking to bring it back and I don't what better way other than this!
The new ShrekBot is designed to be **made by the community!** so forks are always welcomed! I'll be checking forks frequently and updating the bot frequently! Also make sure to post working code!`)
.addFields(
    {name: 'Discord', value: `[Click me](https://discord.gg/V9DHGNtuUe)`},
    {name: 'GitHub', value:`[Click me](https://github.com/BiizoNinja/shrek-bot)` }
)
.setColor(`RANDOM`)

message.channel.send(embed)

}
}