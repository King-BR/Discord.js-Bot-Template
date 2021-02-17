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

const Discord = require("discord.js");
const utils = require("../../utils/index.js");

var Errors = utils.errorHandler;
var Bundles = utils.translationHandler;

  /**
   * @param {Discord.Client} client 
   * @param {Discord.Message} message
   */
module.exports = function (client, message) {
  try {
    
  } catch (error) {
    Errors.newError(error, "ClientError");
  }
};
