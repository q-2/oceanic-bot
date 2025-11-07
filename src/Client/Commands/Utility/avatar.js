import colors from "colors";
import { Constants } from "oceanic.js";

export default {
  name: "avatar",
  description: "Affiche l'avatar d'un utilisateur",
  category: "Utility",
  /**
   * @param {import("../../../Core/Client/Client.js").Client} client
   * @param {import("oceanic.js").Message} message
   * @param {string[]} args
   */
  async run(client, message, args) {
    try {
      if (!message.guild || !message.channel) {
        return;
      }

      const member = message.member;
      if (!member) {
        return;
      }

      let targetUser = message.author;
      let targetMember = member;

      if (message.mentions.length > 0) {
        targetUser = message.mentions[0];
        targetMember = message.guild.members.get(targetUser.id);
      }

      else if (args[0]) {
        try {
          const userId = args[0].replace(/[<@!>]/g, "");
          targetMember = message.guild.members.get(userId);
          if (targetMember) {
            targetUser = targetMember.user;
          } else {
            targetUser = await client.rest.users.get(userId);
          }
        } catch (error) {
          return message.channel.createMessage({
            embeds: [
              {
                description: "-# Utilisateur introuvable",
                color: client.config.color,
                timestamp: new Date().toISOString(),
              },
            ],
            messageReference: {
              messageID: message.id,
              channelID: message.channelID,
              guildID: message.guildID,
              failIfNotExists: false,
            },
            allowedMentions: {
              repliedUser: false,
            },
          });
        }
      }

      const guildAvatar = targetMember?.avatar;
      const globalAvatar = targetUser.avatar;
      let avatarURL;
      let avatarType;

      if (guildAvatar) {
        avatarURL = `https://cdn.discordapp.com/guilds/${message.guildID}/users/${targetUser.id}/avatars/${guildAvatar}.${
          guildAvatar.startsWith("a_") ? "gif" : "png"
        }?size=4096`;
        avatarType = "Avatar de serveur";
      } else if (globalAvatar) {
        avatarURL = `https://cdn.discordapp.com/avatars/${targetUser.id}/${globalAvatar}.${
          globalAvatar.startsWith("a_") ? "gif" : "png"
        }?size=4096`;
        avatarType = "Avatar global";
      } else {
        const defaultAvatarIndex = parseInt(targetUser.discriminator) % 5;
        avatarURL = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
        avatarType = "Avatar par défaut";
      }

      return message.channel.createMessage({
        embeds: [
          {
            title: `${avatarType} de ${targetUser.username}`,
            image: {
              url: avatarURL,
            },
            color: client.config.color,
            timestamp: new Date().toISOString(),
          },
        ],
        messageReference: {
          messageID: message.id,
          channelID: message.channelID,
          guildID: message.guildID,
          failIfNotExists: false,
        },
        allowedMentions: {
          repliedUser: false,
        },
        components: [
          {
            type: Constants.ComponentTypes.ACTION_ROW,
            components: [
              {
                type: Constants.ComponentTypes.BUTTON,
                style: Constants.ButtonStyles.LINK,
                label: "Ouvrir dans la navigateur",
                url: avatarURL,
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error(colors.red(error));
    }
  },
};

