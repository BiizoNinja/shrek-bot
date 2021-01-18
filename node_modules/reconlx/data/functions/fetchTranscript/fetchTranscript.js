async function fetchTranscript(message, numberOfMessages) {
    if(!message) throw new ReferenceError('reconlx => "message" is not defined')
    if(!numberOfMessages) throw new ReferenceError('reconlx => "numberOfMessages" is not defined')
    if(typeof numberOfMessages !== "number") throw new SyntaxError('reconlx => typeof "numberOfMessages" must be a number')
    if(numberOfMessages >= 100) throw new RangeError('reconlx => "numberOfMessages" must be under 100 messages')
    const jsdom = require('jsdom');
    const fs = require('fs')
    const discord = require('discord.js')
    const { JSDOM } = jsdom;
    const dom = new JSDOM();
    const document = dom.window.document;
    let messageCollection = new discord.Collection();
    let channelMessages = await message.channel.messages.fetch({
        limit: numberOfMessages
    }).catch(err => console.log(err));
    messageCollection = messageCollection.concat(channelMessages);

    while(channelMessages.size === 100) {
        let lastMessageId = channelMessages.lastKey();
        channelMessages = await message.channel.messages.fetch({ limit: numberOfMessages, before: lastMessageId }).catch(err => console.log(err));
        if(channelMessages)
            messageCollection = messageCollection.concat(channelMessages);
    }
    let msgs = messageCollection.array().reverse();
    return new Promise(async(ful) => {
        await fs.readFile(require('path').join(__dirname, 'template.html'), 'utf8', async function(err, data) {
            if(data) {
                await fs.writeFile(require('path').join(__dirname, 'index.html'), data, async function(err) {                if(err) return console.log(err) 
                    let info = document.createElement('div')
                    info.className =  'info';
                    let iconClass = document.createElement('div')
                    iconClass.className = 'info__guild-icon-container';
                    let guild__icon = document.createElement('img')
                    guild__icon.className = 'info__guild-icon'
                    guild__icon.setAttribute('src', message.guild.iconURL())
                    iconClass.appendChild(guild__icon)
                    info.appendChild(iconClass)
                    
                    let info__metadata = document.createElement('div')
                    info__metadata.className = 'info__metadata'
    
                    let guildName = document.createElement('div')
                    guildName.className = 'info__guild-name'
                    let gName = document.createTextNode(message.guild.name);
                    guildName.appendChild(gName)
                    info__metadata.appendChild(guildName)
    
                    let channelName = document.createElement('div')
                    channelName.className = 'info__channel-name'
                    let cName = document.createTextNode(message.channel.name);
                    channelName.appendChild(cName)
                    info__metadata.appendChild(channelName)
    
                    let messagecount = document.createElement('div')
                    messagecount.className = 'info__channel-message-count'
                    messagecount.appendChild(document.createTextNode(`Transcripted ${numberOfMessages} messages.`))
                    info__metadata.appendChild(messagecount)
                    info.appendChild(info__metadata)
                    await fs.appendFile(require('path').join(__dirname, 'index.html'), info.outerHTML, async function(err) {
                        if(err) return console.log(err)
                        msgs.forEach(async msg => {
                            let parentContainer = document.createElement("div");
                            parentContainer.className = "parent-container";
                            let avatarDiv = document.createElement("div");
                            avatarDiv.className = "avatar-container";
                            let img = document.createElement('img');
                            img.setAttribute('src', msg.author.displayAvatarURL());
                            img.className = "avatar";
                            avatarDiv.appendChild(img);
            
                            parentContainer.appendChild(avatarDiv);
            
                            let messageContainer = document.createElement('div');
                            messageContainer.className = "message-container";
            
                            let nameElement = document.createElement("span");
                            let name = document.createTextNode(msg.author.tag + " " + msg.createdAt.toDateString() + " " + msg.createdAt.toLocaleTimeString() + " EST");
                            nameElement.appendChild(name);
                            messageContainer.append(nameElement);
            
                            if(msg.content.startsWith("```")) {
                                let m = msg.content.replace(/```/g, "");
                                let codeNode = document.createElement("code");
                                let textNode =  document.createTextNode(m);
                                codeNode.appendChild(textNode);
                                messageContainer.appendChild(codeNode);
                            }
                            else {
                                let msgNode = document.createElement('span');
                                let textNode = document.createTextNode(msg.content);
                                msgNode.append(textNode);
                                messageContainer.appendChild(msgNode);
                            }
                            parentContainer.appendChild(messageContainer);
                            await fs.appendFile(require('path').join(__dirname, 'index.html'), parentContainer.outerHTML, function(err) {
                                if(err) return console.log(err)
                            })
                        });
                        fs.readFile(require('path').join(__dirname, 'index.html'), (err, data) => {
                            if(err) console.log(err)
                            ful(data)
                        })    
                    })
                })
            }
        })
    })
}

module.exports = fetchTranscript;