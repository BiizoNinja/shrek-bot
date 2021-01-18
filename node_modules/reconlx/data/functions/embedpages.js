const { MessageEmbed } = require("discord.js")

async function EmbedPages(message, pages, pageTravel = false, emoji = ['⏪', '⏩'], time = 60000){

    if(!message) throw new ReferenceError('reconlx => "message" is not defined')
    if(!pages || typeof pages !== 'object') throw new SyntaxError('reconlx => Invalid form body [pages]')
    if(!emoji || emoji.length !== 2) throw new SyntaxError('reconlx => Invalid form body [emoji]')
    if(!time) throw new ReferenceError('reconlx => "time" is not defined')
    if(typeof time !== "number") throw new ReferenceError('reconlx => typeof "time" must be a number')
    if(message.guild.me.hasPermission('MANAGE_MESSAGES')) {
        message.channel.send(pages[0]).then(async msg => {
            const ms1 = await message.channel.send(`Page 1 / ${pages.length}`)
            await msg.react(emoji[0])
            await msg.react(emoji[1])
    
        const filter = (reaction, user) => (emoji.includes(reaction.emoji.name)) && user.id === message.author.id;
    
        const collector = msg.createReactionCollector(filter, { time: time });
        let i = 0;
        collector.on('collect', async (reaction, user) => {
            reaction.users.remove(user)
            switch(reaction.emoji.name) {
                case emoji[0] :
                    if(i === 0) return;
                    i--;
                    ms1.edit(`Page ${i + 1} / ${pages.length}`)
                    break;
                case emoji[1] :
                    if(i === pages.length - 1) return;
                    i++;
                    ms1.edit(`Page ${i + 1} / ${pages.length}`)
                    break;
            }
            await msg.edit(pages[i])})
        collector.on('end', () => msg.reactions.removeAll());
        if(pageTravel === true) {
            message.channel.createMessageCollector(x => x.author.id === message.author.id, {time : time, errors : ['time']}).on('collect', async(data) => {
                const a = data.content;
                if(isNaN(a)) return;
                data.delete()
                const b = parseInt(a);
                if(b > 0 && b - 1 <=  pages.length) {
                    i = b -1
                    msg.edit(pages[b -1])
                    ms1.edit(`Page ${b} / ${pages.length}`)
                }
                
            })   
        }
        // message.channel.awaitMessages(fil, {time : 60000, error: ['time']})
        // .then(async (collected) => {
        //     console.log(collected.first())
        //     const a = collected.first()
        //     if(isNaN(a)) return;
        //     const b = parseInt(a);
        //     if(b > 0 && b - 1 <=  pages.length) {
        //         i = b -1
        //         msg.edit(pages[b -1])
        //     }
        // })
        return msg;
        })
    } else {
        message.channel.send(pages[0]).then(async msg => {
            const ms1 = await message.channel.send(`Page 1 / ${pages.length}`)
            await msg.react(emoji[0])
            await msg.react(emoji[1])
    
        const filter = (reaction, user) => (emoji.includes(reaction.emoji.name)) && user.id === message.author.id;
    
        const collector = msg.createReactionCollector(filter, { time: time });
        let i = 0;
        collector.on('collect', (reaction, user) => {
            switch(reaction.emoji.name) {
                case emoji[0] :
                    if(i === 0) return;
                    i--;
                    ms1.edit(`Page ${i + 1} / ${pages.length}`)
                    break;
                case emoji[1] :
                    if(i === pages.length - 1) return;
                    ms1.edit(`Page ${i + 1} / ${pages.length}`)
                    i++;
                    break;
            }
            msg.edit(pages[b -1])
        })
        collector.on('end', () => msg.reactions.removeAll());
        if(pageTravel === true) {
            message.channel.createMessageCollector(x => x.author.id === message.author.id, {time : time, errors : ['time']}).on('collect', async(data) => {
                const a = data.content;
                if(isNaN(a)) return;
                const b = parseInt(a);
                if(b > 0 && b - 1 <=  pages.length) {
                    i = b -1
                    msg.edit(pages[b -1])
                    ms1.edit(`Page ${b} / ${pages.length}`)
                }
                
            }).catch(err =>  msg.reactions.removeAll());
        }
        return msg;
        })
    }
}

module.exports = EmbedPages;