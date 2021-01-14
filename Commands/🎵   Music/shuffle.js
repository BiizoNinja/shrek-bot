module.exports = {
    name: 'shuffle',
    description: 'With this command, you can Shuffle the sonds if there are many songs playing in the queue',
    usage: 's!shuffle',
    run: async (Client, message, args) => {
    let queue = Client.distube.getQueue(message);

    if(queue) {
    const music = args.join(" ")

    Client.distube.shuffle(message, music)
    message.channel.send(`Shuffle. great! Now music will be playing **randomly**`)

    }if(!message.member.voice.channel) {
        return message.reply('What do you want to shuffle?! You need to be in a voice channel ya dummy.')
    }

    }
}
