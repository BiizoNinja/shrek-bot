const client = require('../index');

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`);


            setInterval(()=>{
                client.user.setActivity(`${client.guilds.cache.size} servers! `,{type: "WATCHING"})
            },30000)
           
        });
