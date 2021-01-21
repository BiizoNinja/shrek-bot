const Discord = require('discord.js');

module.exports = {
    name: 'user-info', 
    description: 'Info about user!',
    usage: 's!user-info',
    aliases: ["ui"],
    execute: async(Client, message, args) => {

    let userArray = message.content.split(" ");
    let userArgs = userArray.slice(1);
    let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;

    if (member.presence.status === 'dnd') member.presence.status = '<:DO_NOT_DISTURB:801819120378314803> Do Not Disturb';
    if (member.presence.status === 'online') member.presence.status = ' <:ONLINE:801819271319388180> Online';
    if (member.presence.status === 'idle') member.presence.status = ' <:IDLE:801819429742182442> Idle';
    if (member.presence.status === 'offline') member.presence.status = ' <:OFFLINE:801819529930997810> Offline';

    let x = Date.now() - member.createdAt;
    let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
    const joined = Math.floor(y / 86400000);

    const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
    let status = member.presence.status;

    const userEmbed = new Discord.MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setTimestamp()
    .setColor('BLUE')
    .setImage(member.user.displayAvatarURL())
    .addField("Member ID", member.id)
    .addField('Roles', `<@&${member._roles.join('> <@&')}>`)
    .addField("Account Created On:", ` ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
    .addField('Joined the server At', `${joineddate} \n> ${joined} day(s) Ago`)
    .addField("Status", status)

    message.channel.send(userEmbed);

    }

}
 