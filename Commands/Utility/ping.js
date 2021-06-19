const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Returns latency and API ping',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`**WebSocket** ping is ${client.ws.ping}ms\n**Message edit** ping is ${Math.floor(msg.createdAt - message.createdAt)}m+`)
            .setColor("RED")
            await message.channel.send(embed)
            msg.delete()
            

    }
}