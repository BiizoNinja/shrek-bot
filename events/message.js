const client = require('../index')
const prefix = client.prefix;
const { Collection } = require('discord.js');
const Timeout = new Collection();
const ms = require('ms')

client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    
    if (command) {
        if(command.cooldown) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`Please wait **${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}** before using this command again!`)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.cooldown)
        } else command.run(client, message, args);
    }
});