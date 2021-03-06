import { CommandInteraction } from "discord.js";
import { getBotPermissions, getMemberPermissions } from "@commands/util/help";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

export default class HelpInteraction extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "help",
      description: "Return more information about a command",
      options: [
        {
          name: "command",
          type: "STRING",
          description: "The command you're looking for",
          required: true,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction, args: (string | number | boolean | undefined)[]) {
    const lang = await this.bot.utils.getGuildLang(interaction.guild?.id);

    try {
      const arg = `${args[0]}`;
      const command = this.bot.utils.resolveCommand(arg);

      if (!command) {
        return interaction.reply({ content: lang.HELP.CMD_NOT_FOUND });
      }

      const aliases = command.options.aliases
        ? command.options.aliases.map((alias) => alias).join(", ")
        : lang.GLOBAL.NONE;

      const options = command.options.options
        ? command.options.options.map((option) => option).join(", ")
        : lang.GLOBAL.NONE;

      const cooldown = command.options.cooldown ? `${command.options.cooldown}s` : "3s";
      const guild = await this.bot.utils.getGuildById(interaction.guild?.id);
      const prefix = guild?.prefix;

      const memberPerms = getMemberPermissions(command, lang).join(", ");
      const botPerms = getBotPermissions(command, lang).join(", ");

      const commandDesc = command.options.description
        ? command.options.description
        : lang.GLOBAL.NOT_SPECIFIED;

      const commandUsage = command.options.usage
        ? `${prefix}${command.name} ${command.options.usage}`
        : lang.GLOBAL.NOT_SPECIFIED;

      const embed = this.bot.utils
        .baseEmbed({
          author: interaction.user,
        })
        .addField(lang.HELP.ALIASES, aliases, true)
        .addField(lang.HELP.COOLDOWN, cooldown, true)
        .addField(lang.HELP.USAGE, commandUsage, true)
        .addField(lang.UTIL.CATEGORY, command.options.category, true)
        .addField(lang.UTIL.DESCRIPTION, commandDesc, true)
        .addField(lang.HELP.OPTIONS, options, true)
        .addField(lang.HELP.BOT_PERMS, botPerms, true)
        .addField(lang.HELP.MEMBER_PERMS, memberPerms, true);

      return interaction.reply({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return interaction.reply({ content: lang.GLOBAL.ERROR });
    }
  }
}
