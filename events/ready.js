const client = require('../index');

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`);

    const activity = [
       `${client.guilds.cache.size} servers!`,
       `pog gamers`
        ]   


            setInterval(()=>{
                const index = Math.floor(i);
                client.user.setActivity(activity[index],{type: "WATCHING"})
                console.log(i);
                i = i +1;
                console.log(i);
                if(i === activity.length) i = i -activity.length;
        
            },30000)
           
        });
