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

module.exports = {
  /**
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   */
  run: function (client, message, args) {
    try {
      // code here
      message.channel.send("Hello, World!");
    } catch (err) {
      message.channel.send(Errors.newError(err, this.config.name));
    }
  },

  config: {
    name: "helloworld", // Command name
    aliases: ["hello"], // Command aliases, null it there are no aliases
    desc: "Send a Hello, World! message", // Command description
    usage: "<obligatory parameter> [optional parameter] ...", // Usage parameters, null if there are no parameters
    accessibleby: "everyone", // Accessibility
  },
};
