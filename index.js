/**
 * Main file
 *
 * @license MIT
 * @author King-BR
 */

require("dotenv").config();

require("module-alias").addAliases({
  "@utils": __dirname + "/src/utils",
  "@classes": __dirname + "/src/classes",
  "@languages": __dirname + "/src/languages",
});

const CustomClient = require("@classes/CustomClient.js");

new CustomClient(process.argv.includes("--dev")).login();
