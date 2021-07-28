const Discord = require('discord.js')
const { readdirSync } = require('fs');
const ms = require('ms')

module.exports = {
    name: 'help',
    description: 'list of the command+',
    aliases: ['h'],
    cooldown: 0,
    run: async(client, message, args) => {
        if(!args[0]) {
            let categories = [];
            const dirEmojis = {
                //CURRENCY: "",
                Utility: "⚙",
                Moderation: "🔨",
                Config: "⚙",
                Fun: "🎲",
                Text: "✍",
                Bot: "🤖"
             } 
            readdirSync('./Commands').forEach(dir => {
                if(dir.toLowerCase()=== 'pvt-cmds') return
                const editedName = `${dirEmojis[dir]}-${dir}`
                let commands = readdirSync(`./Commands/${dir}/`).filter(f=>f.endsWith(".js"))
                let cmds = commands.map((command) => {
                    let file = require(`../../Commands/${dir}/${command}`)
                    if(!file.name) return "No Name Provided"
                    let name = file.name.replace(".js", " ")
                     return `\`${name}\``
                })
                let data = new Object()
                data = {
                    name: editedName,
                    value:cmds.length === 0 ? "In Progress..." : cmds.join(' | ')
                }
                categories.push(data)

            })
            
            let embed = new Discord.MessageEmbed()
            .setAuthor(`Help - ${client.user.username}`, client.user.displayAvatarURL({dynamic: true}))
            .setTitle('Help Command!')
            .addFields(categories)
            .setFooter(`Do .help <command-name> for more info!`)
            .setColor(message.guild.me.displayHexColor);

             return message.channel.send(embed)
             
        
        } else {
            let command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases.includes(args[0].toLowerCase()))
            if(!command) return message.channel.send('Command not found!')

            let name = command.name;
            let description = command.description || "No descrpition provided"
            let usage = command.usage || "No usage provided"
            let aliases = command.aliases || "No aliases provided"
            let cooldown = command.cooldown || "No cooldown provided!"

            let embed2 = new Discord.MessageEmbed()
            .setAuthor(`Requested from ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setTitle(`Help - ShrekBot, ${(name.toLocaleString())} Command!`) 
            .setDescription(`> **Here is some info about the command!**\n> Note: If the field has \`< >\` then it is a **required** field. But if the field has \`[ ]\` then it is an **optional** field.\n`)
            .addFields(
                {name: "📋 Description" , value: `\`${description}\``},
                {name: "⌨️ Usage", value: `\`${usage}\``},
                {name: "📎 Aliases" , value: `\`${aliases}\``},
                {name: '⏱️ Cooldown', value: `\`${ms(cooldown)}\``}
            )
            .setColor(message.guild.me.displayHexColor)
            message.channel.send(embed2)

            if(cooldown == 0) {
                let embed3 = new Discord.MessageEmbed()
                .setAuthor(`Requested from ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
                .setTitle(`Help - ShrekBot, ${(name.toLocaleString())} Command!`) 
                .setDescription(`> **Here is some info about the command!**\n> Note: If the field has \`< >\` then it is a **required** field. But if the field has \`[ ]\` then it is an **optional** field.\n`)
                .addFields(
                    {name: "📋 Description" , value: `\`${description}\``},
                    {name: "⌨️ Usage", value: `\`${usage}\``},
                    {name: "📎 Aliases" , value: `\`${aliases}\``},
                    {name: '⏱️ Cooldown', value: `\`None\``}
                )
                .setColor(message.guild.me.displayHexColor)
                message.channel.send(embed3)
            }
        } 
       
    
    }
}