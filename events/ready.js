const client = require('../index');

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`);

    setInterval(() => {
        client.user.setActivity(`Rewrite In progress! Will Be Inactive`, {type: 'PLAYING'})
    }, 40000)
})