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

const chalk = require("chalk");
const fs = require("fs");
const format = require("date-fns/format");
const config = require("../config.json");

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
   * @param {String} [style=config.formatDateStyle] - Type to use when formatting the date
   * @returns {String}
   */
  formatDate: function (date, style = config.formatDateStyle) {
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

  // Errors handler
  errorHandler: require("./error.js"),

  // Multi-language system handler
  translationHandler: require("./translation.js"),
};
