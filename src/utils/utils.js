const fs = require("fs");
const config = require("../../config.json");
const format = require("date-fns/format");
const Chalk = require("chalk");

module.exports = {
  /**
   * Check if the given path is a directory
   * @param {fs.PathLike} path
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

  /**
   * Format date to be human readable
   * @param {Date} date
   * @param {String} style
   * @returns
   */
  formatDate: (date, style = config.formatDateStyle) => {
    return format(date, style);
  },

  /**
   * @type {Chalk}
   */
  chalk: Chalk,
};
