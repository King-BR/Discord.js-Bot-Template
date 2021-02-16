const Discord = require("discord.js");
const utils = require("../../utils/index.js");

var Errors = utils.errorHandler;
var Bundles = utils.translationHandler;

module.exports = {
  /**
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").Message} message 
   * @param {String[]} args 
   */
  run: function(client, message, args) {
    try {
      // code here
      message.channel.send("Hello, World!");

    } catch(err) {
      message.channel.send(Errors.newError(err, this.config.name));
    }
  },

  config: {
    name: "helloworld", // Command name
    aliases: ["hello"], // Command aliases
    desc: "Send a Hello, World! message", // Command description
    usage: "<obligatory parameter> [optional parameter] ...", // Usage parameters
    accessibleby: "everyone" // Accessibility
  }
}