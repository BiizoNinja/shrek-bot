const Discord = require('discord.js')
const { Intents } = require("discord.js")
const fs = require('fs')

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://BiizoNinja:Shashank2007!@cluster0.th9eb.mongodb.net/Data', { useNewUrlParser: true, useUnifiedTopology: true })

const Client = new Discord.Client({
    disableMentions: 'everyone',
    fetchAllMembers: false,
    partials: ['REACTION', 'MESSAGE', 'CHANNEL'],
    ws: { Intents: Intents.All },
  });
const Config = require('./config.json') 
const { on, config } = require('process')
const prefix = require('./models/prefix')

Client.commands = new Discord.Collection()
Client.aliases = new Discord.Collection()
Client.categories = fs.readdirSync('./Commands')


client.once('ready', () =>{
    console.log(`${Client.user.username} is online!` );


    setInterval(()=>{
        client.user.setActivity(`${Client.guilds.cache.size} Guilds! | s!help`,{type: "WATCHING"})
    })
})
let ascii = require('ascii-table')
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
    if(message.content === '<@!789129116015525918> help ') {
        message.reply('Do `s!help` for a full list of commands!')
    }
    if(message.content === '<@!789129116015525918> ') {
        message.channel.send(' My prefix is `s!`')
        
    }
    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    if(message.author.bot) return;

    let args = message.content.slice(prefix.length).trim().split(' ')
    let cmd = args.shift().toLowerCase()
    let command = Client.commands.get(cmd)

    if(data) {
        const prefix = data.Prefix;

        if (!message.content.startsWith(prefix)) return;
        if(!message.guild) return;

        let args = message.content.slice(prefix.length).trim().split(' ')
        let cmd = args.shift().toLowerCase()
        let command = Client.commands.get(cmd)

        const commandfile = Client.commands.get(cmd.slice(prefix.length)) || Client.commands.get(Client.aliases.get(cmd.slice(prefix.length)));
        command.execute(Client, message, args);

    } else if (!data) {
        //set the default prefix here
        const prefix = "s!";
        
        if (!message.content.startsWith(prefix)) return;
        if(!message.guild) return;


        let args = message.content.slice(prefix.length).trim().split(' ')
        let cmd = args.shift().toLowerCase()
        let command = Client.commands.get(cmd)

        const commandfile = Client.commands.get(cmd.slice(prefix.length)) || Client.commands.get(Client.aliases.get(cmd.slice(prefix.length)));
        command.execute(Client, message, args);
    }
})


Client.login(process.env.token)

//Client.login('Nzg5MTI5MTE2MDE1NTI1OTE4.X9tjwg.fEcoG4R8dWQbF4XxY58xcNLOFnE') 
