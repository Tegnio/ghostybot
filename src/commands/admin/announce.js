const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "announce",
  description: "Announce something in a channel",
  usage: "[channel] <text>",
  category: "admin",
  memberPermissions: ["MANAGE_MESSAGES"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    message.delete();
    if (!args[0]) return message.channel.send(lang.ADMIN.TEXT_OR_VALID_CHANNEL + "\n" + lang.ADMIN.DEFAULT_ANNOUNCE_CHANNEL);

    const guild = await bot.utils.getGuildById(message.guild.id);
    const announceChannel = guild.announcement_channel;
    let channel = message.mentions.channels.first();
    let text;

    if (channel) {
      text = args.splice(1).join(" ");
    } else if (announceChannel !== null) {
      channel = message.mentions.channels.first();
      text = args.join(" ");
    } else {
      return message.channel.send(lang.ADMIN.TEXT_OR_VALID_CHANNEL);
    }

    const embed = bot.utils.baseEmbed(message)
    .setTitle(lang.ADMIN.ANNOUNCEMENT)
    .setDescription(text);

    bot.channels.cache.get(announceChannel ? announceChannel : channel.id).send(embed);
  },
};
