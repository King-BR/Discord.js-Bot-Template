const chalk = require("chalk");
const fs = require("fs");
const format = require("date-fns/format");
const { formatDateStyle } = require("../config.json");

module.exports = {
  //#region Mix utils
  chalkClient: {
    chalk: chalk,
    error: chalk.bold.red,
    warn: chalk.bold.keyword("orange"),
    ok: chalk.bold.green,
  },

  /**
   * Format date to be readable for humans
   * @param {Date} date
   * @param {String} [type="config.formatDateStyle"] - Type to use when formatting the date
   * @returns {String}
   */
  formatDate: function (date, style = formatDateStyle) {
    type = type.toLowerCase();
    return format(date, style);
  },

  /**
   * Check if the given path is a directory
   * @param {fs.PathLike} path - path to check
   * @returns {Boolean}
   */
  isDir: function (path) {
    try {
      var stat = fs.lstatSync(path);
      return stat.isDirectory();
    } catch (e) {
      return false;
    }
  },
  //#endregion

  // Error handler
  errorHandler: require("./error.js"),

  // Translation handler
  translationHandler: require("./translation.js"),

  // Temp config data
  setup: function () {
    
  }
};