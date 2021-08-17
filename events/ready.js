const client = require("../index");

client.on("ready", () => {
  console.log(`bot is online`);

  setInterval(() => {
    client.user.setActivity(`${client.guilds.cache.size} Servers | .help`, {
      type: "WATCHING",
    });
  }, 40000);
});