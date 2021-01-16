const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "compliment",
  description: "Get a compliment",
  category: "games",
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    
    const { compliment } = await fetch(
      "https://complimentr.com/api"
    ).then((res) => res.json());

    const embed = bot.utils.baseEmbed(message)
      .setTitle(lang.GAMES.COMPLIMENT)
      .setDescription(compliment);

    message.channel.send(embed);
  },
};
