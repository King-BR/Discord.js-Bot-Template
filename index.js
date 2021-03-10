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

// Bot online 24/7
require("./keep-alive.js");

// NPM
const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");

// Bot config
require("dotenv").config();
const config = require("./config.json");
const utils = require("./src/utils/index.js");
const client = new Discord.Client({
  autoreconnect: true,
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"],
});
client.config = config;
chalkClient = utils.chalkClient;
newError = utils.errorHandler.newError;
isDir = utils.isDir;

// Promise error handler
process.on("unhandledRejection", function (reason, promise) {
  console.log(reason);
});

// Event handler
var eventsSource = fs.readdirSync("events");
console.log('\n------------------\nEvents');
eventsSource.forEach(all => {
  let allSubFolders = all.filter(p => { return isDir(`events/${p}`) });

  allSubFolders.forEach(SubFolder => {
    console.log(`\n${SubFolder}/`);
    let allSub = fs.readdirSync(`events/${SubFolder}`);
    let files = allSub.filter(p => { return !isDir(`events/${SubFolder}/${p}`) && p.split('.').slice(-1)[0] == ".js" });

    files.forEach(f => {
      try {
        let pull = require(`./events/${SubFolder}/${f}`);
        client.on(f.split('.')[0], pull.bind(null, client));
      } catch (err) {
        console.log(`\n- ${f}: ${chalkClient.error("ERROR")}`);
        newError(err, f.split('.')[0]);
        return;
      }
      console.log(`\n- ${f}: ${chalkClient.ok("OK")}`);
    });
  });
});

// Command handler
client.commands = new Discord.Collection();
client.commands = new Enmap();
client.aliases = new Discord.Collection();

let commandsFolder = fs.readdirSync("commands");
console.log("\n------------------\nCommands");
commandsFolder.forEach((folder) => {
  if (folder === "test") return console.log("Test folder found");
  var all = fs.readdirSync(`commands/${folder}`);
  var files = all.filter((f) => {
    let dirCheck = isDir(`commands/${folder}/${f}`);
    return f.split(".").slice(-1)[0] === "js" && !dirCheck;
  });

  console.log(`\n${folder}/`);
  files.forEach((f) => {
    try {
      let pull = require(`./commands/${folder}/${f}`);
      client.commands.set(pull.config.name, pull);
      pull.config.aliases.forEach((alias) => {
        client.aliases.set(alias, pull.config.name);
      });
    } catch (err) {
      console.log(`- ${f}: ${chalkClient.error("ERROR")}`);
      newError(err, f.split('.')[0]);
      return;
    }
    console.log(`- ${f}: ${chalkClient.ok("OK")}`);
  });
});

// Login with Discord API
const token = process.env.DISCORD_TOKEN;
client.login(token);
