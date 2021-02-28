const DIG = require("discord-image-generation");

const { MessageAttachment } = require("discord.js");

 module.exports = {
     name: "affect",
     description: "affect",

     run : async (client, message, args) => {

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author; 

        let img = await new DIG.Affect().getImage(user.displayAvatarURL({ format: "png", dynamic: false }));  

        let attachment = new MessageAttachment(img, "affect.png");

        return message.channel.send(attachment);
    }
     }