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

// Bot online 24/7
require("./keep-alive.js");

// NPM
const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");

// Bot config
require("dotenv").config();
const config = require("./config.json");
const botUtils = require("./utils/index.js");
const client = new Discord.Client({
  autoreconnect: true,
  partials: ["MESSAGE", "REACTION"],
});
client.config = config;

// Utils config
chalkClient = botUtils.chalkClient;
newError = botUtils.errorHandler.newError;
isDir = botUtils.isDir;
//botUtils.clearAllErrors();

// Promise error handler
process.on("unhandledRejection", function (reason, p) {
  console.log(reason);
});

// Event handler
var eventsSource = fs.readdirSync("./events");
eventsSource.forEach(eventsSubfolder => {
  
});

// Command handler
client.commands = new Discord.Collection();
client.commands = new Enmap();
client.aliases = new Discord.Collection();

let commandsFolder = fs.readdirSync("commands");
console.log("\n------------------\nCommands");
commandsFolder.forEach((folder) => {
  if (folder === "test") return console.log("Test folder found");
  var all = fs.readdirSync(`./commands/${folder}`);
  var files = all.filter((f) => {
    let dirCheck = isDir(`./commands/${folder}/${f}`);
    return f.split(".").slice(-1)[0] === "js" && !dirCheck;
  });

  console.log(`\n${folder.replace("ZZZ", "")}/`);
  files.forEach((f) => {
    try {
      let pull = require(`./commands/${folder}/${f}`);
      console.log(`- ${pull.config.name}.js: ${chalkClient.ok("OK")}`);
      client.commands.set(pull.config.name, pull);
      pull.config.aliases.forEach((alias) => {
        client.aliases.set(alias, pull.config.name);
      });
    } catch (err) {
      console.log(`- ${f}: ${chalkClient.error("ERROR")}`);
      newError(err, f)
    }
  });
});

// Login do bot com a API do discord
const token = process.env.TOKEN || client.config.token;
client.login(token);
