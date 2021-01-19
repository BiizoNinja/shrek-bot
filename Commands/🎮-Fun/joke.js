const axios = require('axios')

module.exports = {
    name: 'joke',
    description: 'haha funni joke',
    usage: 's!joke',
    execute: async(Client, message, args) => {
    let getJoke = async () => {
        let response = await axios.get('https://official-joke-api.appspot.com/random_joke')
        let joke = response.data
        return joke
      }
      let jokeValue = await getJoke();
      message.channel.send(`Here is a joke!
      Q: ${jokeValue.setup}
      
      A: **${jokeValue.punchline}**`);
    }
    }

