/*
MIT License

Copyright (c) 2021 King-BR

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const Discord = require("discord.js");
const utils = require("../../utils/index.js");
const os = require("os");
const cpuStat = require("cpu-stat");
const config = require("../../config.json");
const package = require("../../package.json");

var Errors = utils.errorHandler;
var Bundles = utils.translationHandler;
var self = this;

function msToTime(duration) {
  var seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

module.exports = {
  /**
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   */
  run: function (client, message, args) {
    try {
      var bundle = Bundles.loadBundle();
      cpuStat.usagePercent(async function (err, percent, seconds) {
        if (err) return console.log(err);

        const invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${config.permissions}&scope=bot`;
        var devs = config.devsID.map((ID) => {
          return client.users.fetch(ID);
        });
        let creator = bundle.commands.about.creator;
        if (devs.length > 1) creator = bundle.commands.about.creators;

        // prettier-ignore
        var embedInfo = new Discord.MessageEmbed()
          .setTitle(client.user.tag)
          .setTimestamp()
          .setColor("RANDOM")
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512, format: "png" }))
          .setDescription(bundle.commands.about.desc.replace(/\{0\}/g, config.prefix).replace(/\{1\}/g, invite))
          .addField(creator, `${devs.join(", ")}`, true)
          // While it is not required, i would be grateful if you do not remove the credits for using the template
          .addField(bundle.commands.about.createdUsing, `[Discord.js Bot Template](https://github.com/King-BR/Discord.js-Bot-Template) by \@KingBR#3793`, true)
          .addField(bundle.commands.about.botVersion, `v${package.version}`, true)
          .addField(bundle.commands.about.uptime, msToTime(client.uptime), true)
          .addField("\u200b", "\u200b", true) // Blank field
          .addField("\u200b", "\u200b", true) // Blank field
          .setFooter(bundle.commands.about.react);

        // prettier-ignore
        var embedExtendedInfo = new Discord.MessageEmbed()
          .setTitle(client.user.tag)
          .setTimestamp()
          .setColor("RANDOM")
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512, format: "png" }))
          .setDescription(bundle.commands.about.desc.replace(/\{0\}/g, config.prefix).replace(/\{1\}/g, invite))
          .addField(creator, `${devs.join(", ")}`, true)
          // While it is not required, i would be grateful if you do not remove the credits for using the template
          .addField(bundle.commands.about.createdUsing, `[Discord.js Bot Template](https://github.com/King-BR/Discord.js-Bot-Template) by \@KingBR#3793`, true)
          .addField(bundle.commands.about.botVersion, `v${package.version}`, true)
          .addField(bundle.commands.about.uptime, msToTime(client.uptime), true)
          .addField(bundle.commands.about.discordjsVersion, `v${Discord.version}`, true)
          .addField("\u200b", "\u200b", true) // Blank field
          .addField(bundle.commands.about.os, `\`\`${os.platform()} ${os.arch()}\`\``, true)
          .addField(bundle.commands.about.memory, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
          .addField("\u200b", "\u200b", true) // Blank field
          .addField(bundle.commands.about.cpu, `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
          .addField(bundle.commands.about.usedCpu, `\`${percent.toFixed(2)}%\``);

        message.channel.send(embedInfo).then(async (msg) => {
          await msg.react("📝");

          msg
            .awaitReactions((r, u) => r.emoji.name == "📝", {
              max: 1,
              time: 5 * 60000,
              erros: ["time"],
            })
            .then(() => {
              msg.edit(embedExtendedInfo);
              msg.reactions.removeAll().catch();
            })
            .catch((err) =>
              message.channel.send(Errors.newError(err, self.config.name))
            );
        });
      });
    } catch (err) {
      message.channel.send(Errors.newError(err, self.config.name));
    }
  },

  config: {
    name: "about", // Command name
    aliases: ["botinfo"], // Command aliases, null it there are no aliases
    desc: "See information about the bot", // Command description
    usage: null, // Usage parameters, null if there are no parameters
    permissions: ["EMBED_LINKS", "ADD_REACTIONS"], // Permission(s) needed to use the command
    guildOnly: false, // Determines whether the command can only be used on a server
    staffOnly: false, // Determines whether the command can only be used by the server staff
    dmOnly: false, // Determines whether the command can only be used on DM
    ownerOnly: false, // Determines whether the command can only be used by the server owner
    devOnly: false, // Determines whether the command can only be used by the dev team
  },
};
