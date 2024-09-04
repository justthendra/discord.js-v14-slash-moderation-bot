const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Bir kanalın kilidini açarsınız.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    async execute(interaction) {

        interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true,
            AttachFiles: true
        });

        const lockEmb = new EmbedBuilder()
        .setAuthor({ name: "Kanal kilidi açıldı.", iconURL: interaction.user.displayAvatarURL()})
        .setDescription(`${interaction.channel} isimli kanalın kilidi açıldı. Artık herkes kanala mesaj gönderebilir!\n\n**Yetkili**: ${interaction.user.username}`)
        .setColor("Random")
        .setFooter({ text: "Discord.js v14 Moderasyon Bot | Kanal kilidi açıldı", iconURL: interaction.user.displayAvatarURL()})
        .setTitle("Discord.js v14 Moderasyon")
        .setTimestamp()
        .setURL(config.embeds.ytUrl)
        interaction.reply({embeds: [lockEmb]})
    }
}