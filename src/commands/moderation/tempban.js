const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("tempban")
    .setDescription("Bir kullancıyı geçici olarak yasaklayın.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(user =>
        user.setName("kullanıcı")
        .setDescription("Kullanıcıyı belirtin.")
        .setRequired(true)
    )
    .addIntegerOption(minutes =>
        minutes.setName("süre")
        .setDescription("Süre belirtin. (30m, 1h, 2h)")
        .setRequired(true)
    )
    .addStringOption(reason =>
        reason.setName("sebep")
        .setDescription("Belirtilecek bir neden.")
    ),
    async execute(interaction) {
        await interaction.deferReply()

        const target = interaction.options.getUser('kullanıcı');
        const duration = interaction.options.getInteger('süre');
        const reason = interaction.options.getString('sebep') || "Sebep belirtilmedi.";

        const member = interaction.guild.members.cache.get(target.id);
        if (!member) return interaction.reply({ content: "Kullanıcı bulunamadı." });

        try {
            await member.ban({ reason });
            const banEmb = new EmbedBuilder()
            .setAuthor({name: "Bir kullanıcı yasaklandı."})
            .setColor("Random")
            .setDescription(`\`${target.username}\` isimli kullanıcı \`${reason}\` sebebi ile \`${duration}\` süresince yasaklandı.`)
            .setTitle("Discord.js v14 Moderasyon")
            .setFooter({text: "Discord.js v14 Moderasyon Bot | Tempban", iconURL: interaction.client.user.displayAvatarURL()})
            .setTimestamp()
            .setURL(config.embeds.ytUrl)
            interaction.editReply({embeds: [banEmb]})

            setTimeout(async () => {
                await interaction.guild.members.unban(target.id, "Tempban süresi doldu.");

                const unbanEmb = new EmbedBuilder()
                .setAuthor({name: "Bir kullacının yasağı kaldırıldı."})
                .setColor("Random")
                .setDescription(`\`${target.username}\` isimli kullanıcın yasaklanma süresi dolduğu için yasağı kaldırıldı.`)
                .setTitle("Discord.js v14 Moderasyon")
                .setFooter({text: "Discord.js v14 Moderasyon Bot | Tempban", iconURL: interaction.client.user.displayAvatarURL()})
                .setTimestamp()
                .setURL(config.embeds.ytUrl)
                interaction.editReply({embeds: [unbanEmb]}) 
            }, duration * 60 * 1000)
        } catch (error) {
            console.error(error)
        }
    }
}