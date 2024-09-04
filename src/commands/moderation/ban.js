const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bir kullanıcıyı sunucudan yasaklar.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option => 
        option.setName('kullanıcı')
        .setDescription('Kullanıcıyı belirtin.')
        .setRequired(true))
    .addStringOption(reason => 
        reason.setName('sebep')
        .setDescription("Belirtilecek bir neden.")),
    async execute(interaction) {
                
                const user = interaction.options.getMember('kullanıcı');
                const reason = interaction.options.getString('sebep');

                const banEmbed = new EmbedBuilder()
                .setTitle('Discord.js v14 Moderasyon')
                .setColor(config.embeds.colorSuccessfull)
                .setAuthor({name: "Bir kullanıcı yasaklandı."})
                .setDescription(`${user} isimli kullanıcı \`${reason}\` sebebi ile sunucudan yasaklandı.`)
                .setTimestamp()
                .setFooter({text: "Discord.js v14 Moderasyon Bot | Kullanıcı yasaklama", iconURL: interaction.client.user.displayAvatarURL()})
                .setURL("https://github.com/justthendra/discord.js-v14-moderation-bot")
                interaction.reply({embeds: [banEmbed]})
                interaction.guild.members.ban(user, { reason: reason })


                const logEmbed = new EmbedBuilder()
                .setTitle('Discord.js v14 Moderasyon')
                .setColor(config.embeds.colorSuccessfull)
                .setAuthor({name: "Bir kullanıcı yasaklandı."})
                .setDescription(`${user} isimli kullanıcı \`${reason}\` sebebi ile sunucudan yasaklandı.`)
                .setTimestamp()
                .setFooter({text: "Discord.js v14 Moderasyon Bot | Kullanıcı yasaklama", iconURL: interaction.client.user.displayAvatarURL()})
                .setURL("https://github.com/justthendra/discord.js-v14-moderation-bot")

                const channelID = config.guild.channels.modlog;
                const channel = interaction.guild.channels.cache.find(channell => channell.id === channelID)
                channel.send({embeds: [logEmbed]})
            }
}