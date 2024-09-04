const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setnick")
    .setDescription("Bir kullanıcının adını değiştirin.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
    .addUserOption(Option =>
        Option.setName("kullanıcı")
        .setDescription("Kullanıcıyı seçin.")
        .setRequired(true)
    )
    .addStringOption(Option =>
        Option.setName("isim")
        .setDescription("Kullanıcının yeni adını girin.")
        .setRequired(true)
    ),
    async execute(interaction) {
        const user = interaction.options.getMember("kullanıcı");
        const name = interaction.options.getString("isim");

        await user.setNickname(name);
        await interaction.reply({ content: `${user} adlı kullanıcının adı başarıyla değiştirildi.`, ephemeral: true });
    }
}