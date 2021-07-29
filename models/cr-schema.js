const mongoose = require("mongoose");

const crSchema = new mongoose.Schema({
  GuildID: String,
  MinPos: Number,
  MaxPos: Number,
  AllowedRole: String,
});

module.exports = new mongoose.model("crSchema", crSchema);
