const Discord = require('discord.js');
const DisTube = require('distube');
const distube = require('distube');

module.exports = {
    name: 'toggleautoplay',
    description: 'With this command, the server owner or admin can set if autoplay should be toggled [**CURRENTLY DOENT NOT WORK**]',
    usage: 's!toggleautoplay <ON | OFF>',
    examples: 's!toggleautoplay ON',
    run: async (Client, message, args) => {

        let mode = distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    
    }


}