const mongoose = require("mongoose");

module.exports = () => {
    require('dotenv').config()

    mongoose.connect(process.env.MONGO_URL, {
        useFindAndModify: true,
        useUnifiedTopology: true,
    });
};