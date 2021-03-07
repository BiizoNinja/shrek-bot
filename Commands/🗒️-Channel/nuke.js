module.exports = {
    name: 'nuke',
    description: "Nukes a channel",
    usage: "f!nuke",
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR'))
            return message.reply('<a:wrong:777910274011299850>You do not have the permission to do this!');
        let clearchannel = message.channel || message.channel.mentions.first()
        const clonedChannel =  clearchannel.clone()
        clearchannel.delete()

        const embed = new Discord.MessageEmbed()
        .setTitle(`Channel successfully nuked!`)
        .setDescription(`This channel was nuked by <@${message.author.id}>!`)
        .setColor(`RANDOM`)
        .setImage('https://media.tenor.com/images/6e470af0a0fd69c4ff213a8de0bc7c5d/tenor.gif')

      clonedChannel.send(embed);
    }
}