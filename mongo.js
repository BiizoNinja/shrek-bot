const mongoose = require('mongoose') 

module.exports = async () => {
    await mongoose.connect('mongodb+srv://BiizoNinja:qQ2YJLXxfFN9MgoE@shrekbot.th9eb.mongodb.net/Data',{
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
return mongoose
}
