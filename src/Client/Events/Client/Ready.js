import colors from "colors";

export default {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  async run(client) {
    console.log(colors.green(`✓ Bot co ${client.user.tag}`));
    await client.editStatus("dnd", [
      { type: 1, name: ">.<", url: "https://twitch.tv/i01sp" },
    ]);
  },
};