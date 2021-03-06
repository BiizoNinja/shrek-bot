const client = require('../index');

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`);

    setInterval(() => {
        client.user.setActivity(`Prefix is CHANGED! IT IS NOW  \`+\`, {type: 'PLAYING'})
    }, 40000)
})