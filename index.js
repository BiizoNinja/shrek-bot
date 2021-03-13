// --------- Basic Variables ---------

const { Collection, Client, Discord, RichPresenceAssets } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});
const path = require('path')
const fs = require('fs')
const config = require('./config.json');
const Distube = require('distube')

// --------- Mongoose Connected ---------

const mongoose = require('mongoose') 
mongoose.connect('MONGO URL',{
    useNewUrlParser: true,
    useUnifiedTopology: true,

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

// --------- Distube ---------




// --------- Logging in to the bot ---------

client.login(process.env.TOKEN)

//client.login(config.token)


