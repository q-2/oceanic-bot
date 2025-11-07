import colors from "colors";
import { Sequelize, DataTypes } from "sequelize";
import config from "#config";

export class Database {
  constructor(client) {
    this.client = client;
    this.sequelize = null;
    this.models = new Map();
  }

  async createTable() {
    try {
      this.sequelize = new Sequelize(
        config.db.database,
        config.db.user,
        config.db.password,
        {
          host: config.db.host,
          port: config.db.port,
          dialect: "mysql",
          logging: false,
        }
      );

      await this.sequelize.authenticate();
      console.log(colors.green("✓ DB co"));
      await this.client.handler.loadDatabaseModels();
      await this.sequelize.sync({ alter: true });
      console.log(colors.green("✓ Synch bon"));
    } catch (err) {
      const code = err?.original?.code || err?.parent?.code || err?.code;
      if (code === "ER_BAD_DB_ERROR") {
        console.error(colors.red(`✗ DB '${config.db.database}' introuvable ?`));
      } else {
        console.error(colors.red(err));
      }
      throw err;
    }
  }

  registerModel(definer) {
    if (typeof definer === "function" && this.sequelize) {
      try {
        const model = definer(this.sequelize, DataTypes);
        if (model && model.name) {
          this.models.set(model.name, model);
          return model;
        }
      } catch (error) {
        console.error(colors.red(error));
      }
    }
    return null;
  }

  getModel(name) {
    return this.models.get(name);
  }

  getAllModels() {
    return this.models;
  }

  hasModel(name) {
    return this.models.has(name);
  }
}
