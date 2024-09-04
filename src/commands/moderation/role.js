const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Bir kullanıcıdan belirttiğiz rolü verir/alırsınız.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addSubcommand(Subcommand =>
        Subcommand.setName("ver")
        .setDescription("Kullanıcıya rol verir.")
        .addUserOption(Option =>
            Option.setName("kullanıcı")
            .setDescription("Kullanıcıyı seçin.")
            .setRequired(true)
        )
        .addRoleOption(Option =>
            Option.setName("rol")
            .setDescription("Kullanıcıya verilecek rolü seçin.")
            .setRequired(true)
        )
    )
    .addSubcommand(Subcommand =>
        Subcommand.setName("al")
        .setDescription("Kullanıcıdan rol alır.")
        .addUserOption(Option =>
            Option.setName("kullanıcı")
            .setDescription("Kullanıcıyı seçin.")
            .setRequired(true)
        )
        .addRoleOption(Option =>
            Option.setName("rol")
            .setDescription("Kullanıcıdan alınacak rolü seçin.")
            .setRequired(true)
        )
    ),
    async execute(interaction) {

        const user = interaction.options.getMember("kullanıcı");
        const role = interaction.options.getRole("rol");

        if (interaction.options.getSubcommand() === "ver") {
            await user.roles.add(role);
            await interaction.reply({ content: `${user} adlı kullanıcıya ${role} rolü başarıyla verildi.`})
        } else if (interaction.options.getSubcommand() === "al") {
            await user.roles.remove(role);
            await interaction.reply({ content: `${user} adlı kullanıcıdan ${role} rolü başarıyla alındı.`})
        }
    }
}