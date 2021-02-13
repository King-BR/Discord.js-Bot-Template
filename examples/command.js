const Discord = require("discord.js");
const utils = require(`../utils/index.js`);

error = utils.errorHandler

module.exports = {
  /**
   * 
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {String[]} args 
   */
  run: function(client, message, args) {

  },

  config: {
    name: "example", //
    aliases: ["e"], //
    desc: "Example command description", //
    usage: "{COMMAND_NAME} <obligatory parameter> [optional parameter] ...", //
    accessibleby: "everyone" // 
  }
}