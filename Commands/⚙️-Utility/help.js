const Discord = require('discord.js')
const { readdirSync } = require('fs');

module.exports = {
    name: 'help',
    description: 'list of the command+',
    aliases: ['h'],
    run: async(client, message, args) => {
        if(!args[0]) {
            let categories = [];
            readdirSync('./Commands').forEach(dir => {
                if(dir.toLowerCase()=== 'DEVELOPER ONLY') return
                let commands = readdirSync(`./Commands/${dir}/`).filter(f=>f.endsWith(".js"))
                let cmds = commands.map((command) => {
                    let file = require(`../../Commands/${dir}/${command}`)
                    if(!file.name) return "No Name Provided"
                    let name = file.name.replace(".js", "")
                     return `\`${name}\``
                })
                let data = new Object()
                data = {
                    name: dir.toUpperCase(),
                    value: cmds.length === 0 ? "In Progress..." : cmds.join(',')
                }
                categories.push(data)

            })
            
            let embed = new Discord.MessageEmbed()
            .setTitle('Help Command!')
            .setDescription()
            .addFields(categories,
                { name: "\u200c", value: ("<a:Arrow_pointing_right:769978144760791082> [Invite](https://dsc.gg/shrekbot) `|` <a:wumpus_coding:801002702552170506> [Support Server](https://discord.gg/CgzBqZjz2v) `|` <a:topgg:804957699506831391> [Vote Here!](https://top.gg/bot/789129116015525918)" ), inline: true },
            )
            .setFooter(`Do +help <command-name> for more info!`)
            .setThumbnail('https://media.discordapp.net/attachments/753832377054396448/799276629599584256/shrek1.jpg?width=461&height=461')
            .setColor(' #7dff02 ');

             return message.channel.send(embed)
             

        } else {
            let command = client.commands.get(args[0].toLowerCase()) || client.commands.find((C) => c.aliases.include(args[0].toLowerCase()))
            if(!command) return message.channel.send('Command not found!')

            let name = command.name;
            let description = command.description || "No descrpition provided"
            let examples = command.examples || "no examples provided"
            let usage = command.usage || "No usage provided"
            let aliases = command.aliases || "No aliases provided"
            let cooldown = command.timemout || "No cooldown provided!"

            let embed2 = new Discord.MessageEmbed()
            .setTitle(`${(args[0])} Command!`) 
            .setDescription('Some info about the command, If there is <> brackets then that field is REQUIRED, but if there is [] then that feild is OPTIONAL')
            .addFields(
                {name: "Description" , value: description},
                {name: "Usage" , value: usage},
                {name: "Examples" , value: examples},
                {name: "Aliases" , value: aliases},
                {name: 'Cooldown', value: cooldown}
            )
            .setFooter(`Requested By: ${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
            .setColor(' #7dff02')

            return message.channel.send(embed2)
        }
       
    
    }
}