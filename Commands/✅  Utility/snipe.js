module.exports = {
    name: 'snipe',
    description: 'This is the snipe command, when someone deletes a message this command will show the contest on the deleted message!',
    aliases: ['sn'],
    usage: 's!snipe',
    execute: async(Client, message, args) => {
        message.channel.send('IN PROGRESS')

    }

}