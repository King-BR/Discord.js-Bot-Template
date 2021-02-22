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

var Errors = utils.errorHandler;
var Bundles = utils.translationHandler;

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 */
module.exports = function (client, message) {
  try {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (
      !message.content.startsWith(prefix) &&
      !message.mentions.users.get(client.user.id)
    )
      return;

    var bundle = Bundles.loadBundle();

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (
      message.mentions.users.get(client.user.id) &&
      cmd.includes(client.user.id) &&
      !message.content.startsWith(prefix)
    )
      return message.channel.send(
        bundle.events.message.mention
          .replace(/\{0\}/g, message.author.toString())
          .replace(/\{1\}/g, prefix)
      );

    let commandfile =
      client.commands.get(cmd.slice(prefix.length)) ||
      client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
    if (commandfile) commandfile.run(client, message, args);
  } catch (error) {
    Errors.newError(error, "Message");
  }
};
