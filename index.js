// --------- Basic Variables ---------

const { Collection, Client, Discord, RichPresenceAssets } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});
const path = require('path')
const fs = require('fs')
const config = require('./config.json');


// --------- Mongoose Connected ---------

const mongoose = require('mongoose') 
mongoose.connect('mongodb+srv://BiizoNinja:qQ2YJLXxfFN9MgoE@shrekbot.th9eb.mongodb.net/Data',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}),

// --------- Collections ---------

module.exports = client;
client.commands = new Collection();
client.prefix = config.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('Commands'));

["command"].forEach(handler => {
    require(path.resolve(`handlers/${handler}`))(client);
}); 


// --------- Logging in to the bot ---------
//client.login(process.env.TOKEN)

client.login(config.token);


