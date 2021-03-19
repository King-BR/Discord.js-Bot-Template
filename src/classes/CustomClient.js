// prettier-ignore
const { privilegedIntents, partials, translation } = require("../../config.json");
const Discord = require("discord.js");
const { Player } = require("discord-player");

/**
 * Custom client made for the template
 * @class
 * @augments Discord.Client
 */
class CustomClient extends Discord.Client {
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
        intents: privilegedIntents
          ? Discord.Intents.ALL
          : Discord.Intents.NON_PRIVILEGED,
      },
    });

    this.dev = dev || false;
    this.console = require("../utils/logger.js");
    this.utils = require("../utils/utils.js");
    this.translation = translation;
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

  /**
   * Logs the client in, establishing a websocket connection to Discord.
   * @returns {Promise<String>} Token of the account used
   */
  login() {
    // prettier-ignore
    return super.login(this.dev ? process.env.DISCORD_TOKEN_DEV : process.env.DISCORD_TOKEN);
  }

  /**
   * Get an emoji by ID
   * @param {Number} ID
   * @returns {Discord.GuildEmoji}
   */
  getEmojiByID(ID) {
    if (ID == null || isNaN(ID)) return null;
    return this.emojis.fetch(ID);
  }

  /**
   * Get an emoji by name
   * @param {String} name
   * @returns {Discord.GuildEmoji}
   */
  getEmojiByName(name) {
    if (name == null) return null;
    return this.emojis.cache.find((e) => {
      return e.name == name;
    });
  }
}

module.exports = CustomClient;
