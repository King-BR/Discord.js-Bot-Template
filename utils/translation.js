const { translation } = require("../config.json");
const fs = require("fs");


module.exports = {
  /**
   * List all existing translation bundles
   * @returns {String[]} Language code for all existing translation bundles
   */
  listBundles: function () {
    return fs.readdirSync("bundles").map(b => {
      return b.split(".")[0].replace("bundle_", '');
    });
  },

  /**
   * Load translation bundle
   * @param {String} [languageCode="config.translation.default"] - Bundle language code, if not provided will use default bundle defined in config.json file
   * @returns {BundleData}
   */
  loadBundle: function (languageCode = translation.default) {
    if(!module.exports.listBundles().includes(languageCode)) languageCode = "en-US";
    return require(`../bundles/bundle_${languageCode}.json`);
  },

  /**
   * Reload bundle cache
   * @param {String} bundle
   * @returns {void}
   */
  reloadBundle: function (bundle) {
    if(require.cache[require.resolve(`../bundles/${bundle}`)]) {
      delete require.cache[require.resolve(`../bundles/${bundle}`)];
      require(`../bundles/${bundle}`);
    }
  }

};

/**
 * @typedef {Object} BundleData
 * @property {Object} commons - Commons sentences used in several files
 * @property {Object} commons.bot
 * @property {String} commons.bot.noperm
 * @property {String} commons.bot.needperm
 * @property {Object} commons.user
 * @property {String} commons.user.noperm
 * @property {String} commons.user.needperm
 * @property {Object} commons.error
 * @property {String} commons.error.title
 * @property {String} commons.error.desc
 */