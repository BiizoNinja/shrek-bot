const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({ 

    userId: ({
        type: String,
        required: true
    }),
    coins: Number,
    bank: Number,

})

module.exports = mongoose.model('profiles', profileSchema);