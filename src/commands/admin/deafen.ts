import { Message, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class DeafenCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "deafen",
      description: "Deafen a user",
      category: "admin",
      botPermissions: [Permissions.FLAGS.DEAFEN_MEMBERS],
      memberPermissions: [Permissions.FLAGS.DEAFEN_MEMBERS],
      requiredArgs: [{ name: "member" }, { name: "reason" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const deafenMember = await this.bot.utils.findMember(message, args);
      const deafenReason = args.slice(1).join(" ");

      if (!deafenMember) {
        return message.channel.send({
          content: lang.MEMBER.NOT_FOUND,
        });
      }

      if (deafenMember?.voice?.serverDeaf) {
        return message.channel.send({
          content: lang.ADMIN.DEAFEN_ALREADY_DEAFENED,
        });
      }

      deafenMember.voice.setDeaf(true, "deafenReason");

      deafenMember.user.send({
        content: lang.ADMIN.DEAFEN_SUCCESS_DM.replace("{guild}", `${message.guild?.name}`).replace(
          "{reason}",
          deafenReason,
        ),
      });

      return message.channel.send({
        content: lang.ADMIN.DEAFEN_SUCCESS.replace("{member}", `${deafenMember.user.tag}`).replace(
          "{reason}",
          deafenReason,
        ),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
