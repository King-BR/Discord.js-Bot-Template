const Discord = require("discord.js");
const utils = require(`../utils/index.js`);

var Errors = utils.errorHandler;
var Bundles = utils.translationHandler;

module.exports = {
  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {String[]} args 
   */
  run: function(client, message, args) {
    try {
      
    } catch(err) {
      Errors.newError(err, this.config.name)
    }
  },

  config: {
    name: "example", // Command name
    aliases: ["e"], // Command aliases
    desc: "Example command description", // Command description
    usage: "<obligatory parameter> [optional parameter] ...", // Usage parameters
    accessibleby: "everyone" // Accessibility
  }
}