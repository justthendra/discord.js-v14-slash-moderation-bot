const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Belirtilecek miktarda mesaj siler.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addNumberOption(number =>
        number.setName('miktar')
        .setDescription('Mesaj miktarı belirtin.')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)),
        async execute(interaction) {

            const amount = interaction.options.getNumber('miktar')
            const channelID = config.guild.channels.message;
            const channel = interaction.guild.channels.cache.find(channell => channell.id === channelID)

            interaction.reply(`${amount} sayıda mesaj silindi.`).then(message => setTimeout(() => message.delete(), 5000))
            interaction.channel.bulkDelete(amount);

            if (!channel) return;

            if (channel) {
              const logEmbed = new EmbedBuilder()
                .setTitle("Discord.js v14 Moderasyon")
                .setAuthor({ name: "Mesajlar silindi." })
                .setDescription(
                  `\`${amount}\` sayıda mesaj silindi.\n**Kanal:** ${interaction.channel}\n**Yetkili:** ${interaction.user}`
                )
                .setColor(config.embeds.colorDefault)
                .setFooter({
                  text: "Discord.js v14 Moderasyon Bot | Mesaj Silme",
                  iconURL: interaction.client.user.displayAvatarURL(),
                })
                .setTimestamp()
                .setURL(
                  "https://github.com/justthendra/discord.js-v14-moderation-bot"
                );
              channel.send({ embeds: [logEmbed] });
            }
        }
}