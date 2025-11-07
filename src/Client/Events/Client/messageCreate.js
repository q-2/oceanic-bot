export default {
  name: "messageCreate",
  once: false,
  /**
   * 
   * @param {import("oceanic.js").Message}
   * @param {import("../../../Core/Client/Client.js").Client}
   */
  async run(message, client) {
    if (message.author.bot) return;
    if (!message.content.startsWith(client.config.prefix)) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.run(client, message, args);
    } catch (error) {
      console.error(error);
      try {
        await message.channel.createMessage({
          content: "y'a une err",
        });
      } catch {}
    }
  },
};
