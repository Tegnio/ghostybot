import { Message, TextChannel, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class CTopicCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ctopic",
      description: "Update the channel topic",
      category: "admin",
      usage: "<channel> <topic>",
      botPermissions: [Permissions.FLAGS.MANAGE_CHANNELS],
      memberPermissions: [Permissions.FLAGS.MANAGE_CHANNELS],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      let channel: TextChannel = message.mentions.channels.first() as TextChannel;
      let topic: string;

      if (!channel) {
        channel = message.channel as TextChannel;
        topic = args.join(" ");
      } else {
        topic = args.slice(1).join(" ").trim();
      }

      if (!topic) {
        return message.reply({ content: lang.ADMIN.C_TOPIC_PROVIDE_TOPIC });
      }

      await channel.setTopic(topic);
      return message.channel.send({
        content: lang.ADMIN.C_TOPIC_ADDED.replace("{topic}", topic),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
