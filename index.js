const { Client, Collection, Intents} = require("discord.js");

const client = new Client({
    intents: Object.values(Intents.FLAGS)
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
