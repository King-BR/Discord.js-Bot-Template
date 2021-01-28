// Bot online 24/7
require("./keep_alive.js");

// NPM
const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");

// Bot config
require("dotenv").config();
const config = require("./config.json");
const botUtils = require("./utils/index.js");
const client = new Discord.Client({
  disableMentions: "everyone",
  autoreconnect: true,
  partials: ['MESSAGE', 'REACTION']
});
client.config = config;

// Utils config
chalkClient = botUtils.chalkClient;
newError = botUtils.newError;
isDir = botUtils.isDir;
botUtils.clearAllErrors();

// Promise error handler
process.on('unhandledRejection', (reason, p) => { console.log(reason) });


// Event handler
console.log('\n------------------\nEvents');
let source = fs.readdirSync("./events");
source.forEach(foldert => {
  var sla = fs.readdirSync(`./events/${foldert}`);
  console.log(`\n${foldert}/`);
  sla.forEach(filet => {
    try {
      if (!filet.endsWith(".js")) {
        if (isDir(`./events/${foldert}/${filet}`) && filet == "utils") {
          var utilst = fs.readdirSync(`./events/${foldert}/${filet}`);
          console.log(`- ${filet}/`);
          utilst.forEach(fileutils => {
            let nameutil = foldert + fileutils.split(".")[0];
            try {
              require(`./events/${foldert}/${filet}/${fileutils}`);
              console.log(`- - ${fileutils}: ${chalkClient.ok('OK')}`)
            } catch (err) {
              console.log(`- - ${fileutils}: ${chalkClient.error('ERROR')}`);
              console.log(`=> ${newError(err, nameutil)}`);
            }
          })
        }
        return;
      }
      let name = filet.split('.')[0];
      console.log(`- ${name}.js: ${chalkClient.ok('OK')}`);
      let exported = require(`./events/${foldert}/${filet}`);
      client.on(name, exported.bind(null, client));
    } catch (err) {
      console.log(`- ${filet}: ${chalkClient.error('ERROR')}`);
      console.log(`=> ${newError(err, filet)}`);
    }
  });
});

// Command handler 
client.commands = new Discord.Collection();
client.commands = new Enmap();
client.aliases = new Discord.Collection();

let commandsFolder = fs.readdirSync("commands");
console.log('\n------------------\nCommands');
commandsFolder.forEach(folder => {
  if (folder === "teste") return console.log("Achou a pasta teste");
  var all = fs.readdirSync(`./commands/${folder}`);
  var files = all.filter(f => {
    let dirCheck = isDir(`./commands/${folder}/${f}`);
    return f.split(".").slice(-1)[0] === "js" && !dirCheck;
  });
  var UtilsFolder = all.filter(u => {
    let dirCheck = isDir(`./commands/${folder}/${u}`);
    return u === "Utils" && dirCheck;
  });

  console.log(`\n${folder.replace("ZZZ", "")}/`);
  files.forEach(f => {
    try {
      let pull = require(`./commands/${folder}/${f}`);
      console.log(`- ${pull.config.name}.js: ${chalkClient.ok('OK')}`);
      client.commands.set(pull.config.name, pull);
      pull.config.aliases.forEach(alias => {
        client.aliases.set(alias, pull.config.name);
      });
    } catch (err) {
      /*
      Caso aconteça algum erro
      Cria um arquivo chamado "<nome do arquivo com erro>_Error.log"
      */
      console.log(`- ${f}: ${chalkClient.error('ERROR')}`);
      console.log(`=> ${newError(err, f)}`);
    }
  });
});

// Login do bot com a API do discord
const token = process.env.TOKEN || client.config.token;
client.login(token);