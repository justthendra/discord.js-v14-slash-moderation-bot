const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription("Kanalda yavaş modu ayarlar.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(seconds =>
        seconds.setName('saniye')
        .setDescription("Kaç saniye yavaş modu ayarlamak istersiniz?")
        .setRequired(true)
    ),
    async execute(interaction) {
        
        const seconds = interaction.options.getInteger('saniye');

        try {
            await interaction.channel.setRateLimitPerUser(seconds, interaction.user.username + " tarafından yavaş mod ayarlandı.");
            interaction.reply({content: `Yavaş mod ${seconds} saniye olarak ayarlandı.`})
        } catch (err) {
            console.error(err)
        }
    }
}