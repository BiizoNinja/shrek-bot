const mongoose = require('mongoose');

const PrefixSchema = new mongoose.Schema({
    Prefix: {
        type: String
    },
    GuildID: String
});

 module.exports = mongoose.model('prefixes', PrefixSchema);