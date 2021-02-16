
module.exports = {
    name: 'ban' ,
    description:'Bans a user!',
    execute(message, args) {

        if(!message.member.permissions.has('BAN_MEMBERS'))
        return message.reply('You don\'t have the permissions')
    
       const user = message.mentions.users.first(); 

       if(!user) return message.channel.send(`Please specify a member to ban :x:`)
       if(user == message.author) return message.channel.send(`You can ban yourself! :x:`)
       if(user == message.guild.owner) return message.channel.send(`You Can't ban the owner can you? :x:`)
       
       if(user) {
           const member = message.guild.member(user);
       if(!member) {
           message.channel.send(`Make Sure the person you want to ban is in the server :x:`)
       }
       if(member) {
           member.ban().then(()=> {
               message.reply(`Successfully Banned **${user.tag}**`)
               //DM's the banned user
               member.send(`You were banned from **${message.guild.name}**.`)
           }).catch(err =>{
               message.reply(`There was a problem banning that user! \n **POSSIBLE ERROR** \n\`\`\` => I do not have a permission. \`\`\` `);
               console.log(err);
           });
        }
    }

   }
   
}