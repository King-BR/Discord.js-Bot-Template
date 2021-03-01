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
const fs = require("fs");
const utils = require("../../utils/index.js");
const config = require("../../config.json");

var Errors = utils.errorHandler;
var Bundles = utils.translationHandler;

module.exports = {
  /**
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   */
  run: function (client, message, args) {
    try {
      var bundle = Bundles.loadBundle();
      if (!args[0]) {
        var embedHelp = new Discord.MessageEmbed()
          .setTitle(bundle.commands.help.title)
          .setDescription(
            bundle.commands.help.desc.replace(/\{0\}/g, config.prefix)
          )
          .setThumbnail(
            client.user.displayAvatarURL({
              dynamic: true,
              size: 512,
              format: "png",
            })
          )
          .setColor("RANDOM")
          .setTimestamp(new Date());

        let commandsFolder = fs.readdirSync("commands");
        commandsFolder.forEach((folder) => {
          if (folder == "test") return console.log("Test folder found");
          var all = fs.readdirSync(`commands/${folder}`);
          var files = all.filter((f) => {
            let dirCheck = isDir(`commands/${folder}/${f}`);
            return f.split(".").slice(-1)[0] === "js" && !dirCheck;
          });

          let cmds = [];
          files.forEach((f) => {
            let pull = require(`../../commands/${folder}/${f}`);
            cmds.push(pull.config.name);
          });

          embedHelp.addField(folder, cmds.join(", "));
        });

        message.channel.send(embedHelp);
      } else {
        args[0] = args[0].toLowerCase();

        let cmd =
          client.commands.get(args[0]) ||
          client.commands.get(client.aliases.get(args[0]));

        if (!cmd) return message.channel.send(bundle.commands.help.noCmd);

        let aliases = bundle.commands.help.noalias;
        if (cmd.config.aliases && cmd.config.aliases.length > 0)
          aliases = cmd.config.aliases.join(", ");

        var embedExtendedHelp = new Discord.MessageEmbed()
          .setTitle(bundle.commands.help.title)
          .setDescription(
            bundle.commands.help.cmdHelp
              .replace(/\{0\}/g, cmd.config.name)
              .replace(/\{1\}/g, cmd.config.desc)
              .replace(/\{2\}/g, aliases)
              .replace(
                /\{3\}/g,
                `${config.prefix}${cmd.config.name} ${
                  cmd.config.usage ? cmd.config.usage : ""
                }`
              )
              .replace(/\{4\}/g, cmd.config.accessibleby)
          )
          .setColor("RANDOM")
          .setTimestamp(new Date());

        message.channel.send(embedExtendedHelp);
      }
    } catch (err) {
      message.channel.send(Errors.newError(err, this.config.name));
    }
  },

  config: {
    name: "help", // Command name
    aliases: ["commands"], // Command aliases, null it there are no aliases
    desc: "See the list of commands or get extended help about one command", // Command description
    usage: "[command name]", // Usage parameters, null if there are no parameters
    permissions: [], // Permission(s) needed to use the command
    guildOnly: true, // Determines whether the command can only be used on a server
    dmOnly: false, // Determines whether the command can only be used on DM
    ownerOnly: false, // Determines whether the command can only be used by the server owner
    devOnly: false, // Determines whether the command can only be used by the dev team
  },
};
