const fs = require("fs");
const properties = require("properties");

var options = {
  namespaces: true,
  variables: true,
  comments: "#",
  separators: "=",
  strict: true,
};

function createBundlesCache() {
  
}

module.exports = {
  /**
   * Get the language code for all existing translations
   * @returns {String[]} Language code for all existing translations
   */
  getBundles: function () {
    return fs.readdirSync("bundles").filter(f => { return f.split('.')[1] == "properties" }).map(b => {
      if(b == "bundle.properties") return "en-US";
      return b.split(".")[0].replace("bundle_", '');
    });
  },

  /**
   * Load translation bundle
   * @param {String} [languageCode="en-US"] - Language code
   * @returns {BundleData}
   */
  loadBundle: function (languageCode = "en-US") {
    var bundleData;
    if(!module.exports.getBundles().includes(languageCode)) {
      bundleData = fs.readFileSync(`bundles/en-US.properties`, { encoding: "utf8" });
    } else {
      bundleData = fs.readFileSync(`bundles/${languageCode}.properties`, { encoding: "utf8" });
    }

    return properties.parse(bundleData, options);
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
 * 
 */