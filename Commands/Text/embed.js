const Discord = require("discord.js");

module.exports = {
  name: "embed",
  description: "Lets you create custom embed",
  usage: "embed",
  cooldown: 5000,
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send("You don't have proper perms!");
    message.delete();
    message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(
          `Embed Creator | 1/7`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          "What channel do you want your embed to be in?\nYou can cancel the setup at any time by saying `cancel`."
        )
        .setColor("GREEN")
    );
    await startMessageCollectors(
      client,
      message,
      args,
      (m) => m.author.id == message.author.id && m.channel.id == message.channel.id
    );

    function startMessageCollectors(client, message, args, filter) {
      let channelCollector = new Discord.MessageCollector(
        message.channel,
        filter,
        { max: 7 }
      );

      channelCollector.on("collect", async (msg) => {
        let channel = await msg.mentions.channels.first();
        if (msg.content.toLowerCase() === "cancel") {
          msg.channel.send("The embed setup has been cancelled.");
          channelCollector.stop();
          return;
        }
        if (!channel) {
          channel = msg.channel;
          if (!channel.permissionsFor(message.member).has("SEND_MESSAGES"))
            return message.channel.send("yo you cant use that channel mate");
          return;
        } else {
          msg.channel.send(
            new Discord.MessageEmbed()
              .setAuthor(
                `Embed Creator | 2/7`,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setDescription(
                `The embed will be in ${channel}. What title do you want for the embed?`
              )
              .setColor("#GREEN")
          );
        }
        let titleCollector = new Discord.MessageCollector(
          message.channel,
          filter,
          { max: 7 }
        );
        titleCollector.on("collect", async (msg) => {
          let title = msg.content;
          if (msg.content.toLowerCase() === "cancel") {
            msg.channel.send("The embed setup has been cancelled.");
            channelCollector.stop();
            return;
          }
          if (!title) {
            await msg.channel.send(`You didn't specify a title! Cancelled.`);
            await titleCollector.stop();
          } else {
            msg.channel.send(
              new Discord.MessageEmbed()
                .setAuthor(
                  `Embed Creator | 3/7`,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setColor("GREEN")
                .setDescription(
                  `Thats's a nice title! now what color do you want?`
                )
            );
            titleCollector.stop();
          }
          let colorCollector = new Discord.MessageCollector(
            message.channel,
            filter,
            { max: 7 }
          );
          colorCollector.on("collect", async (msg) => {
            let duration = msg.content;
            let reg = new RegExp(/\#....?.?.?/g);
            if (!reg.match(message.content.toLowerCase())) {
              msg.channel.send("That is an invalid color...");
              colorCollector.stop();
              return;
            }
            if (msg.content.toLowerCase() === "cancel") {
              msg.channel.send("The embed setup has been cancelled.");
              colorCollector.stop();
              return;
            } else {
              msg.channel.send(
                new Discord.MessageEmbed()
                  .setColor("GREEN")
                  .setAuthor(
                    `Embed Creator | 4/7`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                  .setDescription(
                    `The color will be ${duration}, now what do you want the description to be?`
                  )
              );
              colorCollector.stop();
            }
            let descriptionCollector = new Discord.MessageCollector(
              message.channel,
              filter,
              { max: 999 }
            );
            descriptionCollector.on("collect", async (msg) => {
              let trueWinners = msg.content;

              if (msg.content.toLowerCase() === "cancel") {
                msg.channel.send("The embed setup has been cancelled.");
                descriptionCollector.stop();
                return;
              } else {
                msg.channel.send(
                  new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(
                      `Embed Creator | 5/7`,
                      message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setDescription(
                      `OH what a nice description! Now, what do you want the footer to be?`
                    )
                );
                descriptionCollector.stop();
              }
              let footerCollector = new Discord.MessageCollector(
                message.channel,
                filter,
                { max: 7 }
              );
              footerCollector.on("collect", async (msg) => {
                let prize = msg.content;
                if (msg.content.toLowerCase() === "cancel") {
                  msg.channel.send("The embed setup has been cancelled.");
                  footerCollector.stop();
                  return;
                }
                if (!prize) {
                  await msg.channel.send(
                    `You didn't specify a footer! Cancelled!`
                  );
                  footerCollector.stop();
                  return;
                } else {
                  msg.channel.send(
                    new Discord.MessageEmbed()
                      .setColor("GREEN")
                      .setAuthor(
                        `Embed Creator | 6/7`,
                        message.author.displayAvatarURL({ dynamic: true })
                      )
                      .setDescription(
                        `What a cool footer! Do you want a timestamp? Type \`yes\` if you do, and type \`no\` if you don't.`
                      )
                  );
                  footerCollector.stop();
                }

                let timestampCollector = new Discord.MessageCollector(
                  message.channel,
                  filter,
                  { max: 7 }
                );
                timestampCollector.on("collect", async (msg) => {
                  if (msg.content.toLowerCase() === "cancel") {
                    msg.channel.send("The embed setup has been cancelled.");
                    timestampCollector.stop();
                    return;
                  }
                  if (msg.content.toLowerCase() === "yes") {
                    await msg.channel.send(
                      new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setAuthor(
                          `${message.author.username}'s Embed`,
                          message.author.displayAvatarURL({ dynamic: true })
                        )
                        .setDescription(
                          `There will be a timestamp. The embed has been sent in ${channel.toString()}.`
                        )
                    );
                    timestampCollector.stop();
                    const embed2 = new Discord.MessageEmbed()
                      .setTitle(title)
                      .setColor(duration)
                      .setDescription(trueWinners)
                      .setFooter(prize)
                      .setTimestamp();
                    message.guild.channels.cache.get(channel.id).send(embed2);
                  } else if (msg.content.toLowerCase() === "no") {
                    msg.channel.send(
                      new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setAuthor(
                          `${message.author.username}'s Embed`,
                          message.author.displayAvatarURL({ dynamic: true })
                        )
                        .setDescription(
                          `There will be no timestamp. The embed has been sent in ${channel}.`
                        )
                    );
                    const embed = new Discord.MessageEmbed()
                      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                      .setTitle(title)
                      .setColor(duration)
                      .setDescription(trueWinners)
                      .setFooter(prize);
                    message.guild.channels.cache.get(channel.id).send(embed);
                    timestampCollector.stop();
                  }
                });
              });
            });
          });
        });
      });
    }
  },
};
