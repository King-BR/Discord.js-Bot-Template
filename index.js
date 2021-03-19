/**
 * Main file
 *
 * @license MIT
 * @author King-BR
 */

require("dotenv").config();

const CustomClient = require("./src/classes/CustomClient.js");
const client = new CustomClient(process.argv.includes("--dev"));

client.login();
