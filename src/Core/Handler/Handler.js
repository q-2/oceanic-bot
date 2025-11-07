import { Client } from "../Client/Client.js";
import { globSync } from "glob";
import { join } from "node:path";
import colors from "colors";

export class Handler {
  /**
   *
   * @param {Client} client
   */
  constructor(client) {
    this.client = client;
  }

  /**
   *
   * @param {string} path
   * @returns {string[]}
   */
  loadFiles(path) {
    return globSync("**/*.js", {
      cwd: join(this.client.basePath, path),
    });
  }

  /** */
  async loadCommands() {
    this.client.commands.clear();
    const basePath = "src/Client/Commands";
    const files = this.loadFiles(basePath);

    for (let i = 0; i < files.length; ++i) {
      try {
        const defaultCommand = await import(
          `file://${join(this.client.basePath, basePath, files[i])}`
        );
        
        const command = defaultCommand.default;

        if (command && command.name && command.run) {
          this.client.commands.set(command.name, command);
          console.log(colors.green(`✓ Cmd: ${command.name}`));
        }
      } catch (error) {
        console.error(colors.red(error));
      }
    }
  }

  /** */
  async loadEvents() {
    const basePath = "src/Client/Events";
    const files = this.loadFiles(basePath);
    const promises = [];

    for (let i = 0; i < files.length; ++i) {
      const promise = import(
        `file://${join(this.client.basePath, basePath, files[i])}`
      )
        .then((defaultEvent) => {
          /**
           * @type {ClientEvent}
           */
          const event = defaultEvent.default;

          if (event && event.name && event.run) {
            this.client[event.once ? "once" : "on"](event.name, (...args) =>
              event.run(...args, this.client)
            );
          }
        })
        .catch(() => {});
      promises.push(promise);
    }

    await Promise.all(promises);
  }

  /** */
  async loadDatabaseModels() {
    const files = this.loadFiles("src/Core/Database/Models");
    const promises = [];

    for (let i = 0; i < files.length; ++i) {
      const promise = import(
        `file://${join(
          this.client.basePath,
          "src/Core/Database/Models",
          files[i]
        )}`
      )
        .then((defaultModel) => {
          let definer = defaultModel.default;

          if (!definer || typeof definer !== "function") {
            for (const key of Object.keys(defaultModel)) {
              if (typeof defaultModel[key] === "function") {
                definer = defaultModel[key];
                break;
              }
            }
          }

          if (definer && typeof definer === "function") {
            const model = this.client.db.registerModel(definer);
            if (model) {
              console.log(colors.green(`✓ Model: ${model.name}`));
            }
          }
        })
        .catch(() => {});

      promises.push(promise);
    }

    await Promise.all(promises);
  }
}