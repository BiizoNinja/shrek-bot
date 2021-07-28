// --------- Basic Variables ---------

const { Collection, Client, Discord, RichPresenceAssets} = require('discord.js');
const client = new Client({
  disableMention: '@everyone'
 });
const path = require('path')
const fs = require('fs')
const config = require('./config.json');
require('discord-reply')

// --------- Collections ---------

module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('Commands'));
client.reply = async(message, text, mention = false) => {
    if(mention) return await message.lineReplyNoMention(text);
   return await message.lineReply(text);
 }

["command"].forEach(handler => {
    require(path.resolve(`handlers/${handler}`))(client);
}); 
// -------- MongoDB ----------
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// --------- Logging in to the bot ---------
require('dotenv').config()
client.login(process.env.BOT_TOKEN)

//client.login(config.token)


