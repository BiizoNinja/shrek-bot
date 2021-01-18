async function confirmation(message, author, validReactions, time = 60000) {
    if(!message) throw new ReferenceError('reconlx => "message" is not defined')
    if(!validReactions || validReactions.length !== 2) throw new ReferenceError('reconlx => Invalid form body [validReactions]')
    if(typeof time !== "number") throw new SyntaxError('reconlx => typeof "time" must be a number')
    if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return console.log(`reconlx err: Discord Client has to have "MANAGE_MESSAGES" permission.`)

    for (const reaction of validReactions) await message.react(reaction)

    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id

    return message
      .awaitReactions(filter, { max: 1, time: time })
      .then((collected) => collected.first() && collected.first().emoji.name);
}

module.exports = confirmation;