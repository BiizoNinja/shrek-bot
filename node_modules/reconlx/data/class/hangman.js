class hangman {
    /**
     * @name hangman
     * @kind constructor
     * @param {Object} options options
     * @param {String} [options.channelID] channel to send to (channel.id)
     * @param {any} [options.message] parameter used for message event
     * @param {String} [options.permission] required permission to use this command
     * @param {String} [options.word] word that needed to be guessed
     * @param {any} [options.client] client used to defined Discord.Client
     * @description Easy and simple hangman game!
     */
    constructor(options) {
        if(!options.channelID) throw new TypeError('Channel ID is a required argument.')
        if(typeof options.channelID !== 'string') throw new TypeError('Channel ID must be in a string')
        if(!options.message) throw new TypeError('Message is a required argument; parameter used for message event')
        if(!options.word) throw new TypeError('Word is an required argument; Word is the word needed to be guessed')
        if(!options.client) throw new TypeError('Client is a required argument; client used to defined Discord.Client')
        this.message = options.message;
        this.channel = this.message.guild.channels.cache.get(options.channelID);
        this.args = options.args;
        this.permission = options.permission;
        this.word = options.word.toLowerCase().replace(/[^a-z\s:]/g, "");
        this.client = options.client;
    }
    async start() {
        var letters = ['🇦', '🇧', '🇨', '🇩', '🇪','🇫', '🇬', '🇭', '🇮', '🇯','🇰', '🇱', '🇲', '🇳', '🇴','🇵', '🇶', '🇷', '🇸', '🇹','🇺', '🇻', '🇼', '🇽', '🇾','🇿']
        var unicode = [ 'a', 'b', 'c', 'd', 'e', 'f','g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r','s', 't', 'u', 'v', 'w', 'x','y', 'z']
        var games = [];

        var stages = [
            `\`\`\`
      /---|
      |   
      |
      |
      |
      \`\`\`
      `,
            `\`\`\`
      /---|
      |   o
      |
      |
      |
      \`\`\`
      `,
            `\`\`\`
      /---|
      |   o
      |   |
      | 
      |
      \`\`\`
      `,
            `\`\`\`
      /---|
      |   o
      |  /|
      |
      |
      \`\`\`
      `,
            `\`\`\`
      /---|
      |   o
      |  /|\\
      |
      |
      \`\`\`
      `,
            `\`\`\`
      /---|
      |   o
      |  /|\\
      |  /
      |
      \`\`\`
      `,
            `\`\`\`
      /---|
      |   o ~ thanks
      |  /|\\
      |  / \\
      |
      \`\`\`
      `,
        ];
        function generateMessage(phrase, guesses) {
            var s = "";
            for (var i = 0; i < phrase.length; i++) {
              if (phrase[i] == " ") s += " ";
              else {
                var c = phrase[i];
                if (guesses.indexOf(c) == -1) c = "\\_";
                s += "__" + c + "__ ";
              }
            }
            return s;
          }
          function nextLetter(message, index, word) {
            message.react(letters[index]).then((r) => {
              index++;
              if (index < letters.length) {
                if (index == 13) {
                  message.channel.send(generateMessage(word, [])).then((m) => {
                    games.push({
                      stage: 0,
                      msg0: message,
                      msg1: m,
                      phrase: word,
                      guesses: [],
                    });
                    nextLetter(m, index);
                  });
                } else {
                  nextLetter(message, index, word);
                }
              }
            });
          }
          this.client.on("messageReactionAdd", (reaction, user) => {
            var msg = reaction.message;
            if (!user.bot) {
              for (var i = 0; i < games.length; i++) {
                var game = games[i];
                if (
                  (msg.id == game.msg0.id || msg.id == game.msg1.id) &&
                  game.stage < stages.length
                ) {
                  var letter = unicode[letters.indexOf(reaction.emoji.name)];
      
                  reaction.users.fetch().then((usrs) => {
                    var reactors = usrs.array();
                    var remove_next = function (index) {
                      if (index < reactors.length)
                        reaction
                          .remove(reactors[index])
                          .then(() => remove_next(index + 1));
                    };
      
                    remove_next(0);
                  });
      
                  if (game.guesses.indexOf(letter) == -1) {
                    game.guesses.push(letter);
                    if (game.phrase.indexOf(letter) == -1) {
                      game.stage++;
                      game.msg0.edit(stages[game.stage]);
                    } else {
                      var sik = true;
                      for (var j = 0; j < game.phrase.length; j++) {
                        var c = game.phrase[j];
                        if (c != " " && game.guesses.indexOf(c) == -1) {
                          sik = false;
                        }
                      }
      
                      if (sik) {
                        game.msg0.edit(
                          stages[game.stage].replace("o", "o ~ ur alright.. for now")
                        );
                      }
      
                      game.msg1.edit(generateMessage(game.phrase, game.guesses));
                    }
                  }
                }
                games[i] = game;
              }
            }
          });
          if(this.permission) {
              if(!this.message.member.hasPermission(this.permission)) return this.message.reply(`You need ${this.permission} permission to use this command.`);
              this.channel.send(stages[0]).then((m) => {
                  nextLetter(m, 0, this.word);
              })
          } else {
            this.channel.send(stages[0]).then((m) => {
                nextLetter(m, 0, this.word);
            })
          }
    }
}

module.exports = hangman;