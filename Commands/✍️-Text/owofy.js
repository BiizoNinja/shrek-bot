const owo = require('owofy')

module.exports = {
name: 'owofy',
description: 'Makes your messages in to owo',
aliases: ["owo"],
usage: '+owofy <message>',
examples: '+owofy hello',
run:async (client, message, args)  => {
    const fullMessage = args.slice(0).join(" ")

    if(!fullMessage) return message.reply('You need to specify something to make owo')

    message.channel.send(owo(`${fullMessage}`))
}

}