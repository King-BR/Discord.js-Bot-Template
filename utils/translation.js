const { translation } = require("../config.json");
const fs = require("fs");
const properties = require("properties");

var options = {
  namespaces: true,
  variables: true,
  comments: "#",
  separators: "=",
  strict: true,
};

/**
 * @private
 */
function createBundlesCache() {
  try {
    var bundles = fs.readdirSync("bundles").filter(f => { return f != "cache.json" });
    var cacheData = {};

    bundles.forEach(b => {
      let data = properties.parse(fs.readFileSync(`bundles/${b}`, { encoding: "utf8" }), options);
      let language = b.split('.')[0];

      if(language == "bundle") {
        language = "en-US";
      } else {
        language = language.replace("bundle_", "");
      }

      cacheData[language] = data;
    });

    fs.writeFileSync("bundles/cache.json", JSON.stringify(cacheData, null, 2), { encoding: "utf8" });

    return true;
  } catch(err) {
    throw err;
  }
}

/**
 * @private
 */
function deleteBundlesCache() {
  if (fs.existsSync("bundles/cache.json")) {
    fs.unlinkSync("bundles/cache.json");
    return true;
  }
  return false;
}

module.exports = {
  /**
   * Get the language code for all existing translations
   * @returns {String[]} Language code for all existing translations
   */
  getBundles: function () {
    return fs.readdirSync("bundles").filter(f => { return f != "cache.json" }).map(b => {
      if(b == "bundle.properties") return "en-US";
      return b.split(".")[0].replace("bundle_", '');
    });
  },

  /**
   * Load translation bundle
   * @param {String} [languageCode="config.translation.default"] - Bundle language code, if not provided will use default bundle defined in config.json file
   * @returns {BundleData}
   */
  loadBundle: function (languageCode = translation.default) {
    var bundleData;
    if(!module.exports.getBundles().includes(languageCode) || languageCode == "en-US") {
      bundleData = fs.readFileSync(`bundles/bundle.properties`, { encoding: "utf8" });
    } else {
      bundleData = fs.readFileSync(`bundles/bundle_${languageCode}.properties`, { encoding: "utf8" });
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
 */