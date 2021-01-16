const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "whale",
  description: "Shows an image of a whale",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const data = await fetch("https://some-random-api.ml/img/whale").then((res) =>
      res.json()
    );

    const embed = bot.utils.baseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.link})`)
      .setImage(data.link);

    message.channel.send(embed);
  },
};
