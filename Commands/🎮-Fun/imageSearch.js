const img = require('images-scraper')
const Discord = require('discord.js')
const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'imageSearch',
    description: 'Search the images for images!',
    usage: 's!imageSearch <Query>',
    aliases: ['image'],
    run : async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send('Please enter a search query')

        const results = await google.scrape(query, 1)

        const embed = new Discord.MessageEmbed()
        .setTitle('Here is you\'re image!')
        .setImage(results[0].url)
        .setFooter(`Requested by: ${message.author.tag}`, message.member.displayAvatarURL({dynamic: true}))
        .setColor('RANDOM');

        message.channel.send(embed)
    }
}