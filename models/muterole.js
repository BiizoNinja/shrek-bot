const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  GuildID: String,
  MuteRole: String,
});

module.exports = new mongoose.model("muteRole", schema);
