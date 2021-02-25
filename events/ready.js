const client = require('../index');

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`);

    setInterval(() => {
        client.user.setActivity(`${client.guilds.cache.size} Guilds! | s!help`, {type: 'WATCHING'})
    }, 40000)
})