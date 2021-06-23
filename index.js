// --------- Basic Variables ---------

const { Collection, Client, Discord, RichPresenceAssets } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});
const path = require('path')
const fs = require('fs')
const config = require('./config.json');


// --------- Collections ---------

module.exports = client;
client.commands = new Collection();
client.prefix = process.env.PREFIX;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('Commands'));

["command"].forEach(handler => {
    require(path.resolve(`handlers/${handler}`))(client);
}); 


// --------- Logging in to the bot ---------
require('dotenv').config()
client.login(process.env.BOT_TOKEN)

//client.login(config.token)


