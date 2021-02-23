const client = require('../index');

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`);

    setInterval(() => {
        client.user.setActivity(`Verification Soon!`, {type: 'WATCHING'})
    }, 40000)
})