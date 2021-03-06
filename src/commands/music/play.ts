import Command from "structures/Command";
import Bot from "structures/Bot";
import { Message } from "discord.js";

export default class PlayCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "play",
      description: "Play a song",
      aliases: ["p"],
      category: "music",
      usage: "<youtube link | song name>",
      requiredArgs: [{ name: "song" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    const voiceChannel = message.member?.voice.channel;
    const search = args.join(" ");
    const queue = this.bot.player.getQueue(message);

    if (!this.bot.user) return;

    if (!search) {
      return message.channel.send({ content: lang.MUSIC.PROVIDE_SEARCH });
    }

    if (!voiceChannel) {
      return message.channel.send({ content: lang.MUSIC.MUST_BE_IN_VC });
    }

    if (queue && !this.bot.utils.isBotInSameChannel(message)) {
      return message.channel.send({ content: "Bot is not in this voice channel!" });
    }

    try {
      const perms = voiceChannel.permissionsFor(this.bot.user);
      if (!perms?.has("CONNECT") || !perms.has("SPEAK")) {
        return message.channel.send({ content: lang.MUSIC.NO_PERMS });
      }

      await this.bot.player.play(message, search, true);
    } catch (e) {
      this.bot.utils.sendErrorLog(e, "error");
    }
  }
}
