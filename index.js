import { Client } from "./src/Core/Client/Client.js";
import config from "./config.js";

const bot = new Client(config);
await bot.start();