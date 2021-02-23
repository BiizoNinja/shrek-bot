
const Discord = require("discord.js")

module.exports = {
 name: 'eval',
 description: '**ONLY DEVELOPER**',
 async: async(client, message, args) => {

  // Number Of Guilds! Client.guilds.cache.map(s => s.name)
  
   const evalcommand = args.slice(0).join(" ")
   const { inspect } = require('util')

   if(message.author.id !== "546631496673394688") return message.channel.send(`This command can only be used by Developers, Current Devs are: BiizoNinja#9999`)


   if(!evalcommand)return message.channel.send("Please specify something to Evaluate")
                                                                                              
   try{
       const evaled = eval(evalcommand)                      

       let evalembed = new Discord.MessageEmbed()
       .setColor('#f03824')
       .setTitle('Evaluated')
       .addField(`To Eval`, `\`\`\`${evalcommand}\`\`\``)
       .addField(`Evalved`,`\`\`\`js\n${inspect(evaled, { depth: 0})}\`\`\``)
       .addField(`TypeOf`,`\`\`\`${typeof(evaled)}\`\`\``)
       
       message.channel.send(evalembed)
   }catch (error){
       let embed1 = new Discord.MessageEmbed()
       .setColor('#f03824')
       .setTitle('Error')
       .addField(`Error`,`${error}`)
       message.channel.send(embed1)
   }
 }
}