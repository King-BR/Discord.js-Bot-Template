const Discord = require("discord.js");
const utils = require(`../../utils/index.js`);

var Errors = utils.errorHandler;
var Bundles = utils.translationHandler;

/**
 * @param {import("discord.js").Client} client 
 */
module.exports = function (client, /* args... */) {
  try {
    // code here


  } catch (err) {
    Errors.newError(err, this.config.name);
  }
};
