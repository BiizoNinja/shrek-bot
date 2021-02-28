const mongoose = require('mongoose') 

module.exports = async () => {
    await mongoose.connect('mongodb+srv://BiizoNinja:cEB7RAtGE9tkMU9P@cluster0.th9eb.mongodb.net/data',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
return mongoose
}
