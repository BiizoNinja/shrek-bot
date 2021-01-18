const figlet = require('figlet')

module.exports = {
    name: 'ascii',
    description: 'Makes a banner!',
    usage: 'f!ascii <your text>',
    execute: async (Client, message, args) => {
        if (!args[0]) return message.channel.send('please provide a some text')
        dd = args.slice(0).join(' ');
        figlet.text(dd, function (err, data) {
            if (err) {
                message.reply('something went wrong')
            }
            if (data.length > 2000) return message.channel.send('please provide text that is fewer than 100 characters')
            message.channel.send('```' + data + '```')

        }
        )
    }
}