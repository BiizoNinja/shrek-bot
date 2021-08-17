const { Client, Collection, Intents} = require("discord.js");

const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
});

module.exports = client;
// MongoDB
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require('./config.json')

// Initializing the project
require("./handler")(client);

require('dotenv').config()
client.login(process.env.BOT_TOKEN);