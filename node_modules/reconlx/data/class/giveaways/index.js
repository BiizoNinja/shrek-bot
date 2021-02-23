const {
  Client,
  MessageEmbed,
  User,
  TextChannel,
  Collection,
  Message,
} = require("discord.js");
const mongoose = require("mongoose");
const GiveawaySchema = require("./schema");
class GiveawayClient {
  /**
   * @name GiveawayClient
   * @kind constructor
   * @param {Client} client
   * @param {Object} options Options
   * @param {String} [options.mongoURI] mongodb connection string
   * @param {String} [options.emoji] emoji for reaction (must be a unicode)
   * @param {String} [options.defaultColor] default colors for giveaway embeds
   * @description Initiating the giveaway client
   */

  constructor(client, options) {
    if (!client) throw new Error("Client is a required argument");
    this.client = client;
    this.collection = new Collection();
    if (mongoose.connection.readyState !== 1) {
      if (!options.mongoURI)
        throw new Error(
          "There is no established  connection with mongoose and a mongoose connection is required!"
        );
      mongoose.connect(options.mongoURI);
    }
    this.emoji = options.emoji || "🎉";
    this.defaultColor = options.defaultColor || "FF0000";
    this.client.on("ready", () => this.ready());
  }
  /**
   * @method
   * @param {Object} options options
   * @param {TextChannel} [options.channel] Channel for the giveaway to be in
   * @param {Number} [options.time] Duration of this giveaway
   * @param {User} [options.hostedBy] Person that hosted the giveaway
   * @param {String} [options.description] Description of the giveaway
   * @param {Number} [options.winners] Amount of winners for the giveaway
   * @param {String} [options.prize] Prize for the  giveaway
   */
  start(options) {
    const { channel, time, winners, prize, description, hostedBy } = options;
    const desc = [
      `Giveaway ends at ${new Date(Date.now() + time).toLocaleString()}\n` +
        `Hosted by: ${hostedBy}`,
    ];
    if (description) desc.push(`Description: ${description}`);
    const embed = new MessageEmbed()
      .setTitle(`${prize}`)
      .setDescription(desc.join("\n"))
      .setFooter(`${winners} winner(s)`)
      .setColor(this.defaultColor)
      .setTimestamp();

    channel.send(embed).then((msg) => {
      msg.react(this.emoji);
      const values = {
        MessageID: msg.id,
        EndsAt: Date.now() + time,
        Guild: msg.guild.id,
        Channel: msg.channel.id,
        winners,
        prize,
        description,
        hostedBy: hostedBy.id,
        Activated: true,
      };
      const newGiveawaySchema = new GiveawaySchema(values);

      newGiveawaySchema.save();
      this.collection.set(values.MessageID, values);
    });
  }
  /**
   * @method
   * @param {String} MessageID Message ID for the giveaway
   * @param {Boolean} getWinner Choose a winner?
   * @description End a giveaway, choose a winner (optional)
   */

  end(MessageID, getWinner) {
    GiveawaySchema.findOne(
      { MessageID, Activated: true },
      async (err, data) => {
        const giveawayChannel = this.client.channels.cache.get(data.Channel);
        if (err) throw err;
        if (!data)
          throw new Error(
            "There are no giveaways currently running with " + MessageID + " id"
          );
        if (getWinner) {
          this.getReactions(data.Channel, data.MessageID, data.winners).then(
            (reactions) => {
              const winners = reactions.map((user) => user).join(", ");
              giveawayChannel.send(
                `Congrats ${winners} you have won **${data.prize}**`
              );
            }
          );
        } else {
          const oldMessage = await this.getMessage(
            data.Channel,
            data.MessageID
          );
          oldMessage.edit(new MessageEmbed().setTitle("Giveaway ended!"));
        }
        data.Activated = false;
        data.save();
        this.collection.delete(MessageID);
      }
    );
  }
  /**
   * @method
   * @param {String} channel channel of the giveaway
   * @param {String} id message id
   * @param {Number} winners amount of winners
   * @description Change the winners for a giveaway!
   */
  reroll(MessageID) {
    return new Promise((ful, rej) => {
      const filtered = this.collection.filter(
        (value) => value.Activated === false
      );
      const data = filtered.get(MessageID);
      if (!data) rej("The giveaway does not exist or has not been ended yet");
      const giveawayChannel = this.getChannel(data.Channel);
      this.getReactions(data.Channel, MessageID, data.winners).then(
        (reactions) => {
          const winner = reactions.map((user) => user).join(", ");
          giveawayChannel.send(
            `Giveway has been rerolled, ${winner} ${
              reactions.size === 1 ? "is" : "are"
            } the new winner for **${data.prize}**`
          );
        }
      );
    });
  }
  /**
   * @method
   * @param {Boolean} activatedOnly display activated giveaways only?
   * @param {Boolean} all display giveaways of  all guilds?
   * @param {Message} message message if (all = false)
   * @description Get data on current giveaways hosted by the bot
   */
  getCurrentGiveaways(activatedOnly = true, all = false, message) {
    return new Promise((ful, rej) => {
      if (all) {
        if (activatedOnly) {
          ful(this.collection.filter((value) => value.Activated === true));
        } else {
          ful(this.collection);
        }
      } else {
        if (activatedOnly) {
          ful(
            this.collection.filter(
              (value) =>
                value.Guild === message.guild.id && value.Activated === true
            )
          );
        }
        ful(
          this.collection.filter((value) => value.Guild === message.guild.id)
        );
      }
    });
  }

  getReactions(channelID, messageID, amount) {
    return new Promise((ful, rej) => {
      this.client.channels.cache
        .get(channelID)
        .messages.fetch(messageID)
        .then((msg) => {
          msg.reactions.cache
            .get(this.emoji)
            .users.fetch()
            .then((users) => {
              const real = users.filter((user) => !user.bot);
              if (amount && !real.size >= amount)
                rej("Not Enough Reactions, winner was not decided");
              ful(real.random(amount));
            });
        });
    });
  }

  ready() {
    GiveawaySchema.find({}).then((data) => {
      if (data.length === 0) return;
      data.forEach((value) => {
        this.collection.set(value.MessageID, value);
      });
    });

    this.checkWinners();
  }

  checkWinners() {
    setInterval(() => {
      const endedGiveaways = this.collection.filter(
        (value) => value.EndsAt < Date.now() && value.Activated === true
      );
      if (endedGiveaways.size === 0) return;

      endedGiveaways.forEach(async (giveaway) => {
        const giveawayChannel = this.getChannel(giveaway.Channel);
        this.getReactions(
          giveaway.Channel,
          giveaway.MessageID,
          giveaway.winners
        )
          .then((reactions) => {
            const winners = reactions.map((user) => user).join(", ");
            giveawayChannel.send(
              `Congrats ${winners} you have won **${giveaway.prize}**`
            );
          })
          .catch((err) => {
            giveawayChannel.send(
              `No winner was determined for giveaway -> https://discord.com/channels/${giveaway.Guild}/${giveaway.Channel}/${giveaway.MessageID}`
            );
          });
        const oldMessage = await this.getMessage(
          giveaway.Channel,
          giveaway.MessageID
        );
        oldMessage.edit(new MessageEmbed().setTitle("Giveaway Ended!"));
        this.collection.get(giveaway.MessageID).Activated = false;
        const props = { MessageID: giveaway.MessageID, Activated: true };
        const data = await GiveawaySchema.findOne(props);
        if (data) data.Activated = false;
        data.save();
      });
    }, 5000);
  }
  /**
   * @method
   * @param {Boolean} all Get data from all guilds?
   * @param {String} guildID guild id if all=false
   * @description Removes (activated = false) giveaways
   */
  removeCachedGiveaways(all = false, guildID) {
    if (!all) {
      GiveawaySchema.find(
        { Guild: guildID, Activated: false },
        async (err, data) => {
          if (err) throw err;
          if (data)
            data.forEach((data) => {
              data.delete();
            });
        }
      );
      const filtered = this.collection.filter(
        (value) => value.Activated === false && value.Guild === guildID
      );
      filtered.forEach((value) => {
        this.collection.delete(value.MessageID);
      });
    } else {
      GiveawaySchema.find({ Activated: false }, async (err, data) => {
        if (err) throw err;
        if (data)
          data.forEach((data) => {
            data.delete();
          });
      });
      const filtered = this.collection.filter(
        (value) => value.Activated === false
      );
      filtered.forEach((value) => {
        this.collection.delete(value.MessageID);
      });
    }
  }

  getChannel(value) {
    return this.client.channels.cache.get(value);
  }

  getMessage(channel, message) {
    return this.client.channels.cache.get(channel).messages.fetch(message);
  }
}

module.exports = GiveawayClient;
