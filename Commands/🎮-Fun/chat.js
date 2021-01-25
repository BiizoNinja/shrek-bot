const alexa = require("alexa-bot-api");
var chatbot = new alexa("aw2plm");

module.exports = {
    name: 'chat',
    description: 'Chat with the bot',
    usage: 's!chat <some text>',
    examples: 's!chat Hi!',
    execute: async (Client, message, args) => {
        let content = message.content;
        if(!args[0]) return message.channel.send("Ask me something")
        chatbot.getReply(content).then(r => message.channel.send(r));
    }
}