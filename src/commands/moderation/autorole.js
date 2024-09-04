const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("otorol")
    .setDescription("Sunucuya katılan kullanıcılara otomatik rol verir.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addRoleOption(option => 
        option.setName("rol")
        .setDescription("Otomatik verilecek rolü belirtin.")
        .setRequired(true)
    ),
    async execute(interaction) {
        const role = interaction.options.getRole('rol');

        const roleDatas = require('../../models/role');

        const roleData = await roleDatas.findOne({ guildId: interaction.guild.id })

        if (!roleData) {
            new roleDatas({
                guildId: interaction.guild.id,
                roleId: role.id
            }).save();

            const emb = new EmbedBuilder()
            .setTitle("Discord.js v14 Moderasyon")
            .setAuthor({name: "Otorol başarıyla ayarlandı."})
            .setDescription(`Otorol başarıyla ${role} rolü olarak ayarlandı.`)
            .setTimestamp()
            .setFooter({text: "Discord.js v14 Moderasyon Bot | Otorol", iconURL: interaction.client.user.displayAvatarURL()})
            .setURL(config.embeds.ytUrl)
            interaction.reply({embeds: [emb]})


            if (roleData) {
                await roleDatas.findOneAndUpdate({
                    roleId: role.id
                });

                const emb = new EmbedBuilder()
                .setTitle("Discord.js v14 Moderasyon")
                .setAuthor({name: "Otorol başarıyla güncellendi."})
                .setDescription(`Otorol başarıyla ${role} rolü olarak güncellendi.`)
                .setTimestamp()
                .setFooter({text: "Discord.js v14 Moderasyon Bot | Otorol", iconURL: interaction.client.user.displayAvatarURL()})
                .setURL(config.embeds.ytUrl)
                interaction.reply({embeds: [emb]})
            }
        }
    }
}