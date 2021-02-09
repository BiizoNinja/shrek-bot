module.exports = {
    name: 'snipe',
    description: 'This is the snipe command, when someone deletes a message this command will show the contest on the deleted message!',
    aliases: ['sn'],
    usage: 's!snipe',
    execute: async(Client, message, args) => {

    const msg = Client.snipes.get(message.channel.id)
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.member.user.displayAvatarURL())
    .setDescription(msg.content)
    .setTimestamp();
    message.channel.send(embed);
}
}


    

