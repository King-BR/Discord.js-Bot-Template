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

const { translation } = require("../config.json");
const fs = require("fs");

module.exports = {
  /**
   * List all existing translation bundles
   * @returns {String[]} Language code for all existing translation bundles
   */
  listBundles: function () {
    return fs.readdirSync("bundles").map((b) => {
      return b.split(".")[0].replace("bundle_", "");
    });
  },

  /**
   * Load translation bundle
   * @param {String} [languageCode="config.translation.default"] - Bundle language code, if not provided will use default bundle defined in config.json file
   * @returns {BundleData}
   */
  loadBundle: function (languageCode = translation.default) {
    if (!module.exports.listBundles().includes(languageCode))
      languageCode = translation.default;
    return require(`../bundles/bundle_${languageCode}.json`);
  },

  /**
   * Reload bundle cache and return its data
   * @param {String} [languageCode="config.translation.default"] - Bundle language code, if not provided will use default bundle defined in config.json file
   * @returns {BundleData}
   */
  reloadBundle: function (languageCode = translation.default) {
    if (!module.exports.listBundles().includes(languageCode))
      languageCode = translation.default;
    if (
      require.cache[require.resolve(`../bundles/bundle_${languageCode}.json`)]
    ) {
      delete require.cache[
        require.resolve(`../bundles/bundle_${languageCode}.json`)
      ];
    }
    return require(`../bundles/bundle_${languageCode}.json`);
  },

  /**
   * Reload all bundles cache
   * @returns {void}
   */
  reloadAllBundles: function () {
    module.exports.listBundles().forEach((languageCode) => {
      if (
        require.cache[require.resolve(`../bundles/bundle_${languageCode}.json`)]
      ) {
        delete require.cache[
          require.resolve(`../bundles/bundle_${languageCode}.json`)
        ];
      }
    });
  },
};

/**
 * @typedef {Object} BundleData
 * @property {Object} commons - Commons sentences used in several files
 * @property {Object} commons.yes
 * @property {Object} commons.no
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
 * @property {Object} commands
 * @property {Object} commands.help
 * @property {String} commands.help.title
 * @property {String} commands.help.desc
 * @property {Object} commands.help.cmdHelp
 * @property {String} commands.help.cmdHelp.name
 * @property {String} commands.help.cmdHelp.desc
 * @property {String} commands.help.cmdHelp.aliases
 * @property {String} commands.help.cmdHelp.usage
 * @property {String} commands.help.cmdHelp.perm
 * @property {String} commands.help.cmdHelp.guildOnly
 * @property {String} commands.help.cmdHelp.dmOnly
 * @property {String} commands.help.cmdHelp.ownerOnly
 * @property {String} commands.help.cmdHelp.staffOnly
 * @property {String} commands.help.cmdHelp.devOnly
 * @property {String} commands.help.noAlias
 * @property {String} commands.help.noPerm
 * @property {String} commands.help.noCmd
 * @property {String} commands.help.params
 * @property {Object} events
 * @property {Object} events.message
 * @property {String} events.message.mention
 */
