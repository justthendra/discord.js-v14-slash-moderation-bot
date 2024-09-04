const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Kanalı kilitleyin.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {

        interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            ViewChannel: true,
            SendMessages: false,
            ReadMessageHistory: true,
            AttachFiles: false
        });

        const lockEmb = new EmbedBuilder()
        .setAuthor({ name: "Kanal kilitlendi.", iconURL: interaction.user.displayAvatarURL()})
        .setDescription(`${interaction.channel} isimli kanal kilitlendi. Artık kimse kanala mesaj gönderemez!\n\n**Yetkili**: ${interaction.user.username}`)
        .setColor("Random")
        .setFooter({ text: "Discord.js v14 Moderasyon Bot | Lock", iconURL: interaction.user.displayAvatarURL()})
        .setTitle("Discord.js v14 Moderasyon")
        .setTimestamp()
        .setURL(config.embeds.ytUrl)
        interaction.reply({embeds: [lockEmb]})
    }
}