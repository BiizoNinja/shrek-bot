const mongoose = require('mongoose')

const SugSchema = new mongoose.Schema({

    GuildID: String, 
    ManagerRole: String, 
    SuggestionChannel: String,

}); 

module.exports = new mongoose.model('SuggestionsSettings', SugSchema)