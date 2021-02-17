const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://BiizoNinja:Shashank2007!@cluster0.th9eb.mongodb.net/Data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const blacklistedguilds = new mongoose.Schema({
   userId: {
       type: String,
       required: true
   }
})

module.exports = mongoose.model(`BLackListed`, blacklistedguilds);