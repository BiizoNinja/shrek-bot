const Discord = require('discord.js')
const { Intents } = require("discord.js")
const fs = require('fs')
const mongoose = require('mongoose')
const Client = new Discord.Client({
    disableMentions: 'everyone',
    fetchAllMembers: false,
    partials: ['REACTION', 'MESSAGE', 'CHANNEL'],
    ws: { Intents: Intents.All },
  });
const Config = require('./config.json') 
const { on, config } = require('process')
const prefix = 's!'
const DisTube = require('distube')


Client.distube = new DisTube(Client, { searchSongs: false, emitNewSongOnly: true });
Client.distube
    .on("playSong",  async (message, queue, song) => {
        let playEmbed = new Discord.MessageEmbed()

        .setTitle('Play Command! <a:peepoSing:798873229539409931> ')
        .setDescription('ShrekBot Music System! Using the `Distube` Package!')
        .addFields(
            {name: `Playing` , value:`\`${song.name}\``},
            {name: `Duration` , value:`\`${song.formattedDuration}\``},
            {name: `Requested by`, value:`${song.user}`},
        )
        .setColor('#46ff00');
       await message.channel.send(playEmbed)

    }
    )
    .on("addSong", async(message, queue, song) => {
        let queueEmbed = new Discord.MessageEmbed()
        .setTitle('Added Song <:sicko:798873188213850144>')
        .setDescription('ShrekBot Music System! Using the `Distube` Package!')
        .addFields(
            {name: `Playing` , value:`\`${song.name}\``},
            {name: `Duration` , value:`\`${song.formattedDuration}\``},
            {name: `Requested by`, value:`${song.user}`},
        )
        .setColor('#46ff00');
       await message.channel.send(queueEmbed)

    }
    )

Client.commands = new Discord.Collection()
Client.aliases = new Discord.Collection()
Client.categories = fs.readdirSync('./Commands')

const activity = [
    `corona is bad`,
    `eshan is cool`,
    `you should really consider watching shrek`,
    `i was made by BiizoNinja#3337... i love him`,
    `if you have problem, join support`,
    `do s!aboutme I DARE YOU!`,
    `happy`,
    `my prefix is s!`,
    `go to biizo's youtube channel ;)`
    ]   
    
    Client.on('ready', () =>{
        console.log(`${Client.user.username} is online`);
        let i = 0;
    
        setInterval(()=>{
            const index = Math.floor(i);
            Client.user.setActivity(activity[index],{type: "PLAYING"})
            i = i +1;
            if(i === activity.length) i = i -activity.length;
    
        },40000)
       
    });

let ascii = require('ascii-table')
const play = require('./Commands/🎵-Music/play')
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
    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) return; 
    if(!message.guild) return;

    let args = message.content.slice(prefix.length).trim().split(' ')
    let cmd = args.shift().toLowerCase()
    let command = Client.commands.get(cmd)


    if(!command) command = Client.commands.get(Client.aliases.get(cmd));
    if(command) command.execute(Client, message, args)
})
Client.login(process.env.token)

//Client.login('Nzg5MTI5MTE2MDE1NTI1OTE4.X9tjwg.fEcoG4R8dWQbF4XxY58xcNLOFnE')