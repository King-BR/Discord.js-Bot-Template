/**
 * Main file
 *
 * @license MIT
 * @author King-BR
 */

require("dotenv").config();
const moduleAlias = require("module-alias");

moduleAlias.addAliases({
  "@utils": __dirname + "/src/utils",
  "@structures": __dirname + "/src/structures",
  "@languages": __dirname + "/src/languages",
});
