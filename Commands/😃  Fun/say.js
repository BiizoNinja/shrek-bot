module.exports = {
    name: 'say',
    description: 'say something... as if you couldn\'t do that anyway :P',
    usage: 's!say <MESSAGE> ',
    examples: 's!say Hi',
    run: async (Client, message, args) => {
      const fullMessage = args.join(" ")

     message.channel.send(` ${fullMessage} 
-**${message.author.tag}**`)

    }
}