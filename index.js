// --------- Basic Variables ---------

const { Collection, Client, Discord, RichPresenceAssets } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});
const path = require('path')
const fs = require('fs')
const config = require('./config.json');
const profileSchema = require('./models/profileSchema')

// --------- Mongoose Connected ---------

const mongoose = require('mongoose') 
mongoose.connect('mongodb+srv://BiizoNinja:Shashank2007@cluster0.th9eb.mongodb.net/Data',{
    useNewUrlParser: true,
    useUnifiedTopology: true
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

// -------- Coin Functions! ---------

client.bal = (userId) => new Promise(async ful => {
    const data = await profileSchema.findOne({userId})
    if(!data) return ful[0]
    ful(data.coins)
}) 

client.add = (userId, coins) => {
  profileSchema.findOne({userId}), async(err, data) => {
      if(err) throw err;
      if(data) {
          data.coins += coins
      }else {
         data = new profileSchema({userId, coins}) 
      }
      data.save;
  }
}

client.remove = (userId, coins) => {
    profileSchema.findOne({userId}), async(err, data) => {
        if(err) throw err;
        if(data) {
            data.coins -= coins
        }else {
           data = new profileSchema({userId, coins: -coins}) 
        }
        data.save;
    }
  }


// --------- Logging in to the bot ---------
//client.login(process.env.token)

client.login(config.token);