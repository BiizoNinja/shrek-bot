const Discord = require('discord.js')
module.exports = {
    name: 'hack',
    description: 'hack others',
    usage: 's!hack <user/userid>',
    examples: 's!hack @BiizoNinja',
    execute: async(Client, message, args) => {
        const user = message.mentions.users.first() 

        if(!user) return message.channel.send('provide a user to hack ;/') 
        if(user) {
         const emails = ["bestguy@gmail.com", "simp1234@hotmail.com", "iliketoeatwood34@gmail.com","fatdiscorddev@outlook.com", `${user.username}_is_single@gmail.com`, "someone@poo.com", "Icandostuff@Moonmail.com", `potatoesarepog@gamerlang.co` ]
         const emailRandomiser = Math.floor((Math.random()* emails.length));

         const passwords = [`${user.username}iscool123`, "1234567890", "P@SSW0RD"]
         const passowrdRandomiser = Math.floor((Math.random()* passwords.length));

         const ips = ["1.22.333.4444", "3.23.32.3232.23"]
         const ipRandomiser = Math.floor((Math.random()* ips.length));

         const msg = await message.channel.send(`Hacking ${user.tag}`);

         setTimeout(() => {
            msg.edit(` <:info_symbol:805408924474802206> __**Found Info!**__
        **Email:** \`${emails[emailRandomiser]}\`
        **Password:** \`${passwords[passowrdRandomiser]}\`
        **IP:** \`${ips[ipRandomiser]}\` 
        pretty pog ngl <:PogChampFixed:773876300816842753> `)
            
         }, 5000)

        }


        
    }
}