const fs = require("fs");
const properties = require("properties");

var options = {
  sections: true,
  namespaces: true,
  variables: true,
  comments: "#",
  separators: "=",
  strict: true,
};

module.exports = {
  /**
   * Load translation bundle
   * @param {String} languageCode - Language code
   * @returns {Object}
   */
  loadBundle: function (languageCode = "en-us") {
    if (!fs.existsSync(`bundles/${languageCode}.properties`))
      languageCode = "en-us";
    
    let bundleData = fs.readFileSync(`bundles/${languageCode}.properties`, {
      encoding: "utf8",
    });

    return properties.parse(bundleData, options);
  },

  /**
   * Get the language code for all existing translations
   * @returns {String[]} Language code for all existing translations
   */
  getAvailableBundles: function () {
    return fs.readdirSync("bundles").map(lc => { return lc.split(".")[0] });
  }
};
