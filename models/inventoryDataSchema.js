const {model, Schema} = require('mongoose')


 module.exports = model("inventory", 
 new Schema ({
    userId: String,
    inventory: Object
})
);
   