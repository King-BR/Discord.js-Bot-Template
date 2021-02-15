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
   * @returns {String[]} Array with all error log files names
   */
  listErrors: () => {
    if (!fs.existsSync("errors")) return [];
    return fs.readdirSync("errors");
  },

  /**
   * Search for an error log using the ID
   * @param errorID {String} Error ID
   * @returns {ErrorObj}
   */
  searchErrorByID: (errorID) => {
    let errorFiles = module.exports.listErrors();
    let errorSearched = errorFiles.filter((errorFile) => {
      let errorData = require(`./errors/${errorFile}`);
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
    errorFiles.forEach((errorFile) => {
      fs.unlinkSync(`./errors/${errorFile}`);
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
    if (!file || !fs.existsSync(path)) throw new Error("Invalid file");
    fs.unlink(path, (err) => {
      if (err) console.log("\n=> " + newError(err, file));
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
