const Discord = require("discord.js");

module.exports = {
  /**
   *
   * @param {Error} err
   * @param {String} [fileName="null"]
   * @param {Object} [ids]
   * @param {Discord.Snowflake|null} [ids.user=null]
   * @param {Discord.Snowflake|null} [ids.server=null]
   * @param {Discord.Snowflake|null} [ids.channel=null]
   * @param {Discord.Snowflake|null} [ids.message=null]
   */
  error(
    err,
    fileName = "null",
    ids = { user: null, server: null, channel: null, message: null }
  ) {},
};

/**
 * @typedef {Object} LogInfo
 * @property {String|Null} [trigger=null] - Command or event that triggered the error
 * @property {Object} [ids] -
 * @property {String|Null} [ids.user=null] - User ID
 * @property {String|Null} [ids.server=null] - Server ID
 */
