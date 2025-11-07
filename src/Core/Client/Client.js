import { Client as OceanicClient } from "oceanic.js";
import { Handler } from "../Handler/Handler.js";
import { Database } from "../Database/index.js";
import { Anticrash } from "../Anticrash/Anticrash.js";
import colors from "colors";

/**
 * @class Client
 * @extends {OceanicClient}
 */

function parseConfig(config) {
  const DefColor = 0x2b2d31;
  try {
    if (config.color?.length > 0) {
      config.color = parseInt(config.color.replace("#", ""), 16);
    } else {
      config.color = DefColor;
    }
  } catch {
    config.color = DefColor;
  }
  return config;
}

export class Client extends OceanicClient {
  constructor(config) {
    super({
      auth: `Bot ${config.token}`,
      gateway: {
        intents: ["ALL"],
        autoReconnect: true,
        maxShards: "auto",
        shardIDs: null,
      },
    });

    this.basePath = process.cwd();
    this.cache = new Map();
    this.commands = new Map();
    this.config = parseConfig(config);
    this.handler = new Handler(this);
    this.db = new Database(this);
    this.anticrash = new Anticrash();

    this.on("error", (error) => console.error(colors.red(error)));
    this.on("warn", (warning) => console.warn(colors.yellow(warning)));
  }

  async start() {
    try {
      this.anticrash.start();
      await this.handler.loadEvents();
      console.log(colors.green(`✓ ${this.eventNames().length} events`));
      await this.handler.loadCommands();
      await this.db.createTable();
      await this.connect();
    } catch (error) {
      console.error(colors.red(error));
      process.exit(1);
    }
  }

  async shutdown() {
    if (this.db?.sequelize) await this.db.sequelize.close();
    this.disconnect(false);
  }
}