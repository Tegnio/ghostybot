const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "bet",
  description: "Bet on somebody",
  category: "games",
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const member = await bot.utils.findMember(message, args);

    if (!member) {
      return message.reply(lang.EASY_GAMES.PROVIDE_MEMBER);
    }

    const n = Math.random();

    const embed = bot.utils.baseEmbed(message)
      .setTitle(
        lang.GAMES.BETS_ON.replace(
          "{member_1}",
          message.author.username
        ).replace("{member_2}", member.user.username)
      )
      .setDescription(
        n > 0.5
          ? lang.GAMES.WON_BET
          .replace("{member_1}", message.author.username)
          .replace("{member_2}", member.user.username)
          .replace("{member_1}", message.author.username)
          : 
          lang.GAMES.LOST_BET
          .replace("{member_1}", message.author.username)
          .replace("{member_2}", member.user.username)
          .replace("{member_1}", message.author.username)
          );

    return message.channel.send(embed);
  },
};
