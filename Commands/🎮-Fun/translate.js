  
const translate = require('translate-google')

module.exports= {
    name : 'translate',
    run : async(client, message, args) => {
        const text = args.join(" ")
        if(!text) return message.channl.send('Please provide a text for me to translate')
        translate(text, {to : 'en'}).then(res => {
            message.channel.send(res)
        }).catch(err => {
            message.channel.send('An error has occured')
            console.log(err)
        })
    }
}