# ❔ reconlx
A simple api to configure and enhance the ways on coding your discord bot. Compatible with discord.js v12 but it should also work on older versions. Variety of different usages for this api.
<div align="center">
  <p>
    <a href="https://nodei.co/npm/reconlx
/"><img src="https://nodei.co/npm/reconlx.png?downloads=true&stars=true" alt="NPM info" /></a>
  </p>
</div>


---

# 📝 Table of contents
+ [Installation](https://www.npmjs.com/package/reconlx#installation)
+ [Usages](https://www.npmjs.com/package/reconlx#-usages-click-on-it-for-more-info-on-how-to-use-it)
+ [Importing](https://www.npmjs.com/package/reconlx#-importing)
+ [Support](https://www.npmjs.com/package/reconlx#%E2%99%82%EF%B8%8F-support)
+ [License](https://apache.org/licenses/LICENSE-2.0.html)

---

## Installation

First install [Node.js](http://nodejs.org/). Then:

```sh
$ npm install reconlx
```
## 🛠 Usages (Click on it for more info on how to use it)
+ [reconDB](https://www.npmjs.com/package/reconlx#recondb) - simple way to store data into mongodb
+ [DaysAgo](https://www.npmjs.com/package/reconlx#daysago) - check how many days ago was it using date format
+ [ReactionPages](https://www.npmjs.com/package/reconlx#ReactionPages) - simple pagination to make your "MessageEmbed" interactable.
+ [Confirmation](https://www.npmjs.com/package/reconlx#confirmation) - A reaction collector which returns the first emoji collected, can be used as a confirmation prompt.
+ [fetchTranscript](https://www.npmjs.com/package/reconlx#fetchtranscript) - Specify an amount of messages and it will return a discord chat template with messages, acts like a transcript.
+ [timeout](https://www.npmjs.com/package/reconlx#timeout) - Makes it easier to delete messages according to your needs
+ [chatBot](https://www.npmjs.com/package/reconlx#chatbot) - Replies to your messages in discord.
+ [hangman](https://www.npmjs.com/package/reconlx#hangman) - Hangman game now playable in discord.
+ [tictactoe](https://www.npmjs.com/package/reconlx#tictactoe) - TicTacToe game now playable in discord.
## ✈ Importing

```javascript
// Using Node.js `require()`
const recon = require('reconlx');

// Using ES6 imports
import recon from 'reconlx';
```

## 🙋‍♂️ Support
Feel free to join the support discord server -> https://discord.gg/xCCpfth

---
## 🔧 Usages

---

## DaysAgo

```javascript
// Example on checking how long the member's account was created.
// Import the package
const recon = require('reconlx')
// Destructure the package
const daysAgo = recon.daysAgo
const discord = require('discord.js')

client.on('guildMemberAdd', async(member) => {
    console.log(daysAgo(member.user.createdAt)) // return days.
})
```

## ReactionPages
#### Example : 
```js
// Example on checking how long the member's account was created.
// Import the package
const recon = require('reconlx')
// Destructure the package
const ReactionPages = recon.ReactionPages
// Use either MessageEmbed or RichEmbed to make pages
// Keep in mind that Embeds should't have their footers set since the pagination method sets page info there
const { MessageEmbed } = require('discord.js');
const embed1 = new MessageEmbed().setTitle('1')
const embed2 = new MessageEmbed().setTitle('2')
// Create an array of embeds.
const pages = [
    embed1,
    embed2
]
// Change pages when sending numbers.
const textPageChange = true;
// Create an emojilist, first emoji being page back and second emoji being page front. Defaults are set to  ['⏪', '⏩'].
const emojis = [
    "⏪",
    "⏩"
]
// Define a time in ms, defaults are set to 60000ms which is 60 seconds. Time on how long you want the embed to be interactable
const time = 30000
// Call the ReactionPages method, use the <message> parameter to initialize it.
ReactionPages(msg, pages, textPageChange, emojis, time); 
//There you go, now you have embed pages.
```
#### Preview on a music list : 
![preview](https://imgur.com/wduFcGP.png)

---

## confirmation
```js
// destructure the package
const { confirmation } = require('reconlx')
// Here is an example on using it in banning members.
message.channel.send('Confirmation for banning members').then(async msg => {
  // parameters used(which msg to react on, who can acess it, reactions, time(optional))
  const emoji = await confirmation(msg, message.author, ['✅', '❌'], 30000)
  if(emoji === '✅') { //if author reacts on check
    //delete the confirmation message
    msg.delete()
    //ban the member
    guildMember.ban()
  } 
  if(emoji === '❌') { // if author reacts on cross
  // delete the confirmation message
    msg.delete()
  }
})
```
---

## fetchTranscript
```js
// destructure the package
const { fetchTransript } = require('reconlx')

// here is how you use it

// template
// fetchTranscript(message: any, numberOfMessages: number, sendToAuthor: boolean)

// returns buffer

//example
module.exports = {
  name : 'transcript',
  run : async(client, message) => {
    fetchTranscript(message, 5)
            .then(data => {
                const file = new MessageAttachment(data, 'index.html');
                message.channel.send(file)
            })
  }
}
// it will fetch 5 messages in the current channel.
```
### Preview on a general chat
![preview](https://i.imgur.com/CB1a6eD.png)

---

## timeout
```js
// destructure the package
const { timeout } = require('reconlx')

// example

const messageToDelete = await message.channel.send('Hello There 👋')

// using the method
// template => timeout(message: who can acess, msgToDelete: which message to delete,time: time before the emoji gets deleted)
timeout(message, messageToDelete, 5000) // only message.author can areact, messageToDelete is going to deleted if collected reactions, if no reactions after 5 seconds the reaction will be removed.
```

### Preview

![preview](https://i.imgur.com/EV8WZja.gif)

---

## chatBot
```js
const { chatBot } = require('reconlx')

/** @parameters
 * message, message.channel
 * input, input to give
*/

// example

 chatBot(message, args.join(" "))
```


### Preview
![preview](https://imgur.com/DeThtZJ.png)

---

## hangman
```js
//importing
const { hangman } = require('reconlx')

// parameters
    /**
     * @name hangman
     * @param {Object} options options
     * @param {String} [options.channelID] channel to send to (channel.id)
     * @param {any} [options.message] parameter used for message event
     * @param {String} [options.permission] required permission to use this command (optional); default set to everyone.
     * @param {String} [options.word] word that needed to be guessed
     * @param {any} [options.client] client used to defined Discord.Client
     */

    // making hangman
        const hang = new hangman({
            message: message,
            word:  args.slice(1).join(" "),
            client: client,
            channelID: message.mentions.channels.first()
        })

    // starting the game
        hang.start()
```


###  Preview 
![preview](https://imgur.com/GSRHlRr.png)

## tictactoe
```js
//importing
const { tictactoe } = require('reconlx')

// parameters
      /**
     * @name tictactoe
     * @param {Object} options options
     * @param {any} [options.message] parameter used for message event
     * @param {any} [options.player_two] second player in the game.
     */

    // start the game

    var game = new tictactoe({
      message: message,
      player_two : message.mentions.members.first()
    })

```


### Preview
![preview](https://imgur.com/lxKhF1b.png)

---
---
---

# reconDB
## 1. Importing the package

```js
const { reconDB } = require('reconlx')
// or
import { reconDB } from 'reconlx'
```

## 2. Establishing and exporting reconDB

```js
const db = new reconDB({
  uri : "your mongodb connection string"
})

module.exports = db;
```

## 3. Example on using it

```js
const db = require('./db.js') // replace db.js with your file path to the setup of reconDB

db.set('numbers', '123')
```

## Methods

### .set

```js
// saves data to database
db.set('key', 'value')
```

### .get

```js
// gets value from key
db.get('key') // returns => value
```

### .has

```js
// returns boolean
db.has('key') // returns => true
```

### .delete

```js
// deletes data
db.delete('key')

// checking for data
db.has('key') // returns => false
```















