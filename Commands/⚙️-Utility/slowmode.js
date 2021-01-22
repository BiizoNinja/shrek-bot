
module.exports = {
    name: 'slowmode',
    description: "Changes the slowmode of the chat",
    usage: 's!slowmode <value>',
    examples: 's!slowmode 10',
    aliases: ['sm'],
    execute: async(Client, message, args) => {
        message.channel.send('IN PROGRESS')
    }
}