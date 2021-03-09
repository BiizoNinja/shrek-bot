const { MessageAttachment } = require("discord.js");
const DIG = require('discord-image-generation')

module.exports = {

    name: "slap",
    description: "NOICE",

     async run (client, message, args) {

        const user = message.author;
        const user2 = message.mentions.users.first()
        if(!user2) return message.channel.send('you need to mention a user to slap')

        const img = await new DIG.Batslap().getImage(user.displayAvatarURL({ dynamic: false, format: 'png' }), user2.displayAvatarURL({ dynamic: false, format: 'png' }));
        const attach = new MessageAttachment(img, "slap.png");
        message.channel.send(attach);
       
    }
}