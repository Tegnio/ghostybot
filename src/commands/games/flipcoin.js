const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "flipcoin",
  description: "Flip a coin",
  category: "games",
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild.id);

    const replies = [
      `**${lang.GAMES.LANDED_HEADS}**`,
      `**${lang.GAMES.LANDED_TAILS}**`,
    ];

    const reply = replies[Math.floor(Math.random() * replies.length)];

    const embed = bot.utils.baseEmbed(message)
      .setTitle("FlipCoin")
      .setDescription(`${reply}`);

    message.channel.send(embed);
  },
};
