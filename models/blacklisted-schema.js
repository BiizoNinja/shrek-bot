const mongoose = require('mongoose')

const blacklistedguilds = new mongoose.Schema({
   userId: {
       type: String,
       required: true
   }
})

module.exports = mongoose.model(`BLackListedGuilds`, blacklistedguilds);