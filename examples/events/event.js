/*
Change the file name to match the event name, example:
message: message.js
guildMemberUpdate: guildMemberUpdate.js
channelCreate: channelCreate.js
*/

const Discord = require("discord.js");
const utils = require("../../utils/index.js");

var Errors = utils.errorHandler;
var Bundles = utils.translationHandler;

/**
 * @param {import("discord.js").Client} client 
 */
module.exports = function (client, /* event args... */) {
  try {
    // code here
    console.log("Hellow, World!");

  } catch (err) {
    Errors.newError(err, this.config.name);
  }
};
