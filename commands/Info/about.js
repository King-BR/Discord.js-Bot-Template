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
      cpuStat.usagePercent(async function (err, percent, seconds) {
        if (err) return console.log(err);

        const invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=${config.permissions}&scope=bot`;
        var devs = config.devsID.map((ID) => {
          return client.users.fetch(ID);
        });
        let s = "";
        if (devs.length > 1) s = "s";

        // prettier-ignore
        var embedInfo = new MessageEmbed()
          .setTitle(client.user.tag)
          .setTimestamp()
          .setColor("#001299")
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512, format: "png" }))
          .setDescription(`My prefix is: ${config.prefix}\n\nIf you want to invite me to your server click *__[here](${invite})__*`)
          .addField(`Creator${s}`, `${devs.join(", ")}`, true)
          // While it is not required, i would be grateful if you do not remove the credits for using the template
          .addField("Created using", `[Discord.js Bot Template v0.1.0](https://github.com/King-BR/Discord.js-Bot-Template) by \@KingBR#3793`, true)
          .addField("\u200b", "\u200b", true) // Blank field
          .addField("Statistics", `Total servers: ${client.guilds.cache.size}\nTotal users: ${client.users.cache.size}\nTotal commands: ${client.commands.map(c => c).size}`, true)
          .addField("Uptime", msToTime(client.uptime), true)
          .addField("Bot version", `v${package.version}`, true)
          .setFooter("React below for more info");

        // prettier-ignore
        var embedExtendedInfo = new MessageEmbed()
          .setTitle(client.user.tag)
          .setTimestamp()
          .setColor("#001299")
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512, format: "png" }))
          .setDescription(`My prefix is: ${config.prefix}\n\nIf you want to invite me to your server click *__[here](${invite})__*`)
          .addField(`Creator${s}`, `${devs.join(", ")}`, true)
          // While it is not required, i would be grateful if you do not remove the credits for using the template
          .addField("Created using", `[Discord.js Bot Template v0.1.0](https://github.com/King-BR/Discord.js-Bot-Template) by \@KingBR#3793`, true)
          .addField("\u200b", "\u200b", true) // Blank field
          .addField("Statistics", `Total servers: ${client.guilds.cache.size}\nTotal users: ${client.users.cache.size}\nTotal commands: ${client.commands.map(c => c).size}`, true)
          .addField("Uptime", msToTime(client.uptime), true)
          .addField("Bot version", `v${package.version}`, true)
          .addField("Used memory", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
          .addField("Discord.js version", `v${version}`, true)
          .addField("OS", `\`\`${os.platform()} ${os.arch()}\`\``, true)
          .addField("CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
          .addField("Used CPU", `\`${percent.toFixed(2)}%\``, true);

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
              msg.reactions.removeAll();
            })
            .catch((err) => message.channel.send(Errors.newError(err, this.config.name)));
        });
      });
    } catch (err) {
      message.channel.send(Errors.newError(err, this.config.name));
    }
  },

  config: {
    name: "about", // Command name
    aliases: ["botinfo"], // Command aliases, null it there are no aliases
    desc: "See information about the bot", // Command description
    usage: null, // Usage parameters, null if there are no parameters
    accessibleby: "everyone", // Accessibility
  },
};
