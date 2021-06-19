const client = require('../index');

const activity = [
    `${client.users.cache.size} members!`,
    `github.com/BiizoNinja`,
    `people develop me`
    ]   
    
    client.on('ready', () =>{
        console.log(`bot is online`);
        let i = 0;
    
        setInterval(()=>{
            const index = Math.floor(i);
            client.user.setActivity(activity[index],{type: "WATCHING"})
            i = i +1;
            if(i === activity.length) i = i -activity.length;
    
        }, 40000)
       
    });
        
