const Discord = require("discord.js");

module.exports = {
    name: "hack",
    description: "hack a user",
    run: async(client, message, args) => {
    
    const eMails = [
        "epicgamer@pogmail.com",
        "sugon.deez@nuts.com",
        "nevergonnagive@you.up",
        "animegirls@weirdo.au",
        "orangutan@pog.com",
        "amogus@sus.red",
        "lookin.thick@pogmail.com"
    ]
    const emailRandom = Math.floor(Math.random()* eMails.length)

    const password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

        function wait(ms){
            let start = new Date().getTime();
            let end = start;
            while(end < start + ms) {
              end = new Date().getTime();
           }
         }

        const taggedUser = message.mentions.users.first();
        if (!taggedUser) {
            return message.channel.send('Please mention somebody to hack!');
        }
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${taggedUser.tag} got hacked!`, taggedUser.displayAvatarURL({dynamic: true}))
        .setDescription(`**__Found Info!__**\n> Emails: ${eMails[emailRandom]}\n> Password: ${password}\n`)
        .setColor(message.guild.me.displayHexColor)
        .setFooter('totally real!1!!1!')

        message.channel.send(`Hacking  **${taggedUser.tag}***...`);
        
        message.channel.send('Status: □□□□□□□□□ 0%')
        .then(msg => {
            for (let i = 0, c = Math.floor((Math.random() * 100) + 45), b = 0, bc; i < c; i++) {
                if (Number(i/c*100) > b * 10) {
                    for (let fl = 0; fl < b; fl++) { bc += "■"};
                    for (let bl = 0; bl < 10-b; bl++) { bc += "□"};
                    b++
                }
                wait((Math.random() * 100) + 12);
                msg.edit(`Status: ${bc} ${(i/c*100).toFixed(2)}%`);
            }
            
            msg.edit('Status: ■■■■■■■■■■ 100%').then(async() => {
            const fMsg = await message.channel.send(`Successfully hacked **${taggedUser.tag}**! Fetching Information... <a:blueLoading:856159438024605709>`)  
            setTimeout(() => {
                fMsg.edit('Information Found', embed)
            }, 5000);
            })  
        })


    }
}
