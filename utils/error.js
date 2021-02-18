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

const fs = require("fs");
const { chalkClient, formatDate } = require("./index.js");
const { MessageEmbed } = require("discord.js");
const { loadBundle } = require("./translation.js");

var bundle = loadBundle();

module.exports = {
  /**
   * Create a new error log
   * @param {Error} err
   * @param {String} [fileName="null"]
   * @returns {MessageEmbed}
   */
  newError: function (err, fileName = "null") {
    if (!err) return;

    // Check if the "errors" folder exist, if not, create it
    if (!fs.existsSync("errors")) fs.mkdirSync("errors");

    let ms = new Date();
    fileName = `${fileName}_${ms}.json`;
    let errorFileContent = {
      msg: err.message ? err.message : null,
      stack: err.stack ? err.stack : null,
      date: formatDate(ms),
      ms: ms,
      thisFile: `errors/${fileName}`,
    };

    // Create the error log file
    fs.writeFileSync(
      `errors/${fileName}`,
      JSON.stringify(errorFileContent, null, 2),
      { encoding: "utf8" }
    );

    console.log(chalkClient.error(bundle.commons.error.title));

    return new MessageEmbed()
      .setTitle(bundle.commons.error.title)
      .setDescription(bundle.commons.error.desc);
  },

  /**
   * List all errors
   * @returns {ErrorObj[]} Array with all errors data
   */
  listErrors: () => {
    if (!fs.existsSync("errors")) return [];

    return fs.readdirSync("errors").map(e => { return require(`../errors/${e}`)});
  },

  /**
   * Search for an error log using the ID
   * @param errorID {String} Error ID
   * @returns {ErrorObj|null}
   */
  searchErrorByID: (errorID) => {
    let errorFiles = module.exports.listErrors();
    let errorSearched = errorFiles.filter((errorData) => {
      return errorData.errorID == errorID;
    });
    if (errorSearched.length > 0) {
      errorSearched = errorSearched[0];
    } else {
      errorSearched = null;
    }
    return errorSearched;
  },

  /**
   * Clear all error logs
   * @returns {void}
   */
  clearAllErrors: () => {
    let errorFiles = module.exports.listErrors();
    errorFiles.forEach((errorData) => {
      fs.unlinkSync(`errors/${errorData.thisFile}`);
    });
    return;
  },

  /**
   * Delete an error log
   * @param {String} file - Error log file to delete
   * @returns {void}
   */
  deleteError: (file) => {
    let path = `./errors/${file}`;
    if (!file || !fs.existsSync(path)) throw new Error(bundle.commons.error.invalidFileError);
    fs.unlink(path, (err) => {
      if (err) newError(err, file);
    });
    return;
  },
};

/**
 * @typedef {Object} ErrorObj
 * @property {String} msg - Error message
 * @property {String} stack - Error stack
 * @property {String} date - Date when the error occured
 * @property {number} ms - UNIX timestamp
 * @property {String} thisFile - This error log file name
 */
