/**
 *  Discord.js Bot Template
 *  Copyright (C) 2021  King-BR
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
    if(!module.exports.listBundles().includes(languageCode)) languageCode = translation.default;
    return require(`../bundles/bundle_${languageCode}.json`);
  },

  /**
   * Reload bundle cache and return its data
   * @param {String} [languageCode="config.translation.default"] - Bundle language code, if not provided will use default bundle defined in config.json file
   * @returns {BundleData}
   */
  reloadBundle: function (languageCode = translation.default) {
    if(!module.exports.listBundles().includes(languageCode)) languageCode = translation.default;
    if(require.cache[require.resolve(`../bundles/bundle_${languageCode}.json`)]) {
      delete require.cache[require.resolve(`../bundles/bundle_${languageCode}.json`)];
    }
    return require(`../bundles/bundle_${languageCode}.json`);
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
 * @property {String} commons.error.invalidFileError
 */