const Discord = require('discord.js')
const { Intents } = require("discord.js")
const fs = require('fs')
const mongo = require('./mongo')
const mongoose = require('mongoose');
const ms = require('ms')

const Client = new Discord.Client({
    fetchAllMembers: true,
    partials: ['REACTION', 'MESSAGE', 'CHANNEL'],
    ws: { Intents: Intents.All },
  });
const Config = require('./config.json') 
const { on, config } = require('process')

Client.commands = new Discord.Collection()
Client.aliases = new Discord.Collection()
Client.categories = fs.readdirSync('./Commands')
const Timeout = new Set();



Client.once('ready', () =>{
    console.log(`${Client.user.username} is online!` );


    setInterval(()=>{
        Client.user.setActivity(`${Client.guilds.cache.size} Guilds! | s!help`,{type: "WATCHING"})
    }, 40000)
})
let ascii = require('ascii-table');
const { cooldown } = require('./Commands/🪙-Economy/beg');
let table = new ascii("Commands")
table.setHeading("Command", "Status");

fs.readdirSync('./Commands/.').forEach(dir => {
    let commands = fs.readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith(".js"))
    for(let file of commands) {
        let pull = require(`./Commands/${dir}/${file}`);
        if(pull.name) {
            table.addRow(file, "Good To Go")
            Client.commands.set(pull.name, pull)
        }
        else {
            table.addRow(file, "Error!")
            continue;
        }
        if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => Client.aliases.set(alias, pull.name));

    }
})
console.log(table.toString())

Client.on('message', async message => {

    if(message.author.bot) return;
    const prefix = "s!";

    let args = message.content.slice(prefix.length).trim().split(' ')
    let cmd = args.shift().toLowerCase()
    let command = Client.commands.get(cmd)
        
    if (!message.content.startsWith(prefix)) return;
    if(!message.guild) return;


    if (!command) command = Client.commands.get(Client.aliases.get(cmd));
    if(command) {
        if(Timeout.has(`${message.author.id}${command.name}`)) {
           return message.reply(`<a:slow_roach:806819955475349534> Whoa! Slow down there bud, The cooldown for this command is: **${ms(command.timeout.get(`${message.author.id}${command.name}`))}**!`)
        } else  {
            Timeout.add(`${message.author.id}${command.name}`)
            setTimeout(() => {
                Timeout.delete(`${message.author.id}${command.name}`)
            }, command.timeout);
        }
        command.execute(Client, message, args)
    }
    
})

Client.login(process.env.token)


//Client.login('Nzg5MTI5MTE2MDE1NTI1OTE4.X9tjwg.fEcoG4R8dWQbF4XxY58xcNLOFnE') 
