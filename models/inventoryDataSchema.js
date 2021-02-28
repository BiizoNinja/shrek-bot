const mongoose = require('mongoose')


const invData = new mongoose.Schema({
    userId: ({
        type: String,
        required: true
    }),
    inventory: Object
})

module.exports = mongoose.model('inventoryData', invData )