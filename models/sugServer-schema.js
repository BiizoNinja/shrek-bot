const mongoose = require("mongoose");

const SugServer = new mongoose.Schema({
  GuildID: String,
  SuggestID: String,
  Suggestion: String,
  Suggestor: String
});

module.exports = new mongoose.model("ServerSuggestion", SugServer);