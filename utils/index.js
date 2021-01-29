const chalk = require("chalk");
const fs = require("fs");
const format = require("date-fns/format");

module.exports = {
  //#region Mix utils
  chalkClient: {
    chalk: chalk,
    error: chalk.bold.red,
    warn: chalk.bold.keyword("orange"),
    ok: chalk.bold.green,
  },

  /**
   * Format date to dd/MM/yyy HH:mm:ss
   * @param {Date} date
   * @returns {String}
   */
  formatDate: function (date) {
    return format(date, "dd/MM/yyyy HH:mm:ss");
  },

  /**
   * 
   * @param {import("fs").PathLike} path
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

  error: require("./error.js"),
};