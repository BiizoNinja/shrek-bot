const DIG = require("discord-image-generation");

const { MessageAttachment } = require("discord.js");
module.exports = {

    name: "slap",
    description: "NOICE",

     async run (client, message, args) {

        const userarray = message.mentions.users.array();
            
        const user = message.author
        const user2 = message.mentions.users.first()

        const img = await new DIG.Batslap().getImage(user.displayAvatarURL({ dynamic: false, format: 'png' }), user2.displayAvatarURL({ dynamic: false, format: 'png' }));
        const attach = new MessageAttachment(img, "slap.png");
        message.channel.send(attach);
       
    }
}