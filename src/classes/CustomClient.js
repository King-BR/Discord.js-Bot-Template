const { Client, Intents } = require("discord.js");
const {
  privilegedIntents,
  partials,
  translation,
} = require("../../config.json");
const { Player } = require("discord-player");

class CustomClient extends Client {
  /**
   * @param {Boolean} dev
   * @constructor
   */
  constructor(dev) {
    super({
      fetchAllMembers: false,
      disableMentions: "everyone",
      partials: partials,
      messageCacheMaxSize: 100,
      messageCacheLifetime: 240,
      messageSweepInterval: 300,
      messageEditHistoryMaxSize: 2,
      ws: {
        intents: privilegedIntents ? Intents.ALL : Intents.NON_PRIVILEGED,
      },
    });

    this.dev = dev || false;
    this.console = console; // TODO implement logger
    this.utils = require("@utils/utils.js");
    this.player = new Player(this, {
      leaveOnEnd: true,
      leaveOnEndCooldown: 60,
      leaveOnStop: true,
      leaveOnEmpty: true,
      leaveOnEmptyCooldown: 60,
      autoSelfDeaf: true,
      quality: "high",
      enableLive: false,
    });
  }

  login() {
    // prettier-ignore
    return super.login(this.dev ? process.env.DISCORD_TOKEN_DEV : process.env.DISCORD_TOKEN);
  }
}
