//Basic Connections
const Discord = require('discord.js')
const { Intents } = require("discord.js")
const fs = require('fs')
const mongo = require('./mongo')
const mongoose = require('mongoose');
const ms = require('ms')
const profileschema = require('./models/profile-schema')

const Client = new Discord.Client({
    fetchAllMembers: true,
    partials: ['REACTION', 'MESSAGE', 'CHANNEL'],
    ws: { Intents: Intents.All },
  });
const Config = require('./config.json') 
const { on, config } = require('process')

//All the properties
Client.commands = new Discord.Collection()
Client.aliases = new Discord.Collection()
Client.categories = fs.readdirSync('./Commands')
const Timeout = new Set();

//Connect to mongoose 

mongoose.connect('mongodb+srv://BiizoNinja:Shashank2007!@cluster0.th9eb.mongodb.net/Data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//Ready Event
Client.once('ready', () =>{
    console.log(`${Client.user.username} is online!` );


    setInterval(()=>{
        Client.user.setActivity(`${Client.guilds.cache.size} Guilds! | s!help`,{type: "WATCHING"})
    }, 40000)
})
//GuildCreate Event
Client.on('guildCreate', (guild) => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));

    if (!channel) return;
    console.log(`I got added to ${guild.name}`)
    const { MessageEmbed } = require('discord.js');
    channel.send(
        new MessageEmbed()
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .setTitle('Thank You!')
            .setDescription(`Thank you for inviting me! My prefix is \`s!\`\n You can do \`s!help\` for a list of commads! \n I'll do my best to help! \n If you need help check the [Support Server](https://discord.gg/CgzBqZjz2v) `)
            .setColor("GREEN")
            .setTimestamp()
    )
})

//console ascii feature
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

//Message Event
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
           return message.reply(`<a:slow_roach:806819955475349534> Whoa! Slow down there bud, the cooldown for this command is: **${ms(command.timeout)}**!`)
        } else  {
            Timeout.add(`${message.author.id}${command.name}`)
            setTimeout(() => {
                Timeout.delete(`${message.author.id}${command.name}`)
            }, command.timeout);
        }
        command.execute(Client, message, args)
    }
    
})
//Message Delete Event
Client.snipes = new Discord.Collection()

Client.on('messageDelete', async message => { 
    if(message.author.bot) return;
    Client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author.tag,
      member: message.member,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})
//Economy Functions 
Client.bal = (id) => new Promise(async ful => {
    const data = await profileschema.findOne({id})
    if(!data) return ful(0)
    ful(data.coins)
})

Client.add = (id, coins) => {
    profileschema.findOne({ id}, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.coins += coins;
        }else {
            data = new schema({id, coins})
        }
        data.save
    })
}
Client.remove = (id, coins) => {
    profileschema.findOne({ id}, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.coins -= coins;
        }else {
            data = new schema({id, coins: -coins})
        }
        data.save
    })
}


Client.login(process.env.token)


//Client.login('Nzg5MTI5MTE2MDE1NTI1OTE4.X9tjwg.fEcoG4R8dWQbF4XxY58xcNLOFnE') 
