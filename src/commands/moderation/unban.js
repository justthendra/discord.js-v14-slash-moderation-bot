const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Bir kullacının yasağını kaldırırsınız.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(id => 
        id.setName('id')
        .setDescription('ID belirtin.')
        .setRequired(true)),
        async execute(interaction) {

            const user = interaction.options.getString('id');

            const unbanEmbed = new EmbedBuilder()
            .setTitle('Discord.js v14 Moderasyon')
            .setAuthor({name: "Bir kullanıcının yasağı kaldırıldı."})
            .setDescription(`\`${user}\` id'li kullanıcının yasağı kaldırıldı. Kullanıcı artık sunucuya katılabilir.`)
            .setColor(config.embeds.colorSuccessfull)
            .setFooter({text: "Discord.js v14 Moderasyon Bot | Unban", iconURL: interaction.client.user.displayAvatarURL()})
            .setTimestamp()
            .setURL("https://github.com/justthendra/discord.js-v14-moderation-bot")
            interaction.reply({embeds: [unbanEmbed]})
            interaction.guild.members.unban(user)

            const logEmbed = new EmbedBuilder()
            .setTitle('Discord.js v14 Moderasyon')
            .setAuthor({name: "Bir kullanıcının yasağı kaldırıldı."})
            .setDescription(`\`${user}\` id'li kullacının yasağı kaldırıldı.`)
            .setColor(config.embeds.colorSuccessfull)
            .setFooter({text: "Discord.js v14 Moderasyon Bot | Unban", iconURL: interaction.client.user.displayAvatarURL()})
            .setTimestamp()
            .setURL("https://github.com/justthendra/discord.js-v14-moderation-bot")

            const channelID = config.guild.channels.modlog;
            const channel = interaction.guild.channels.cache.find(chanell => chanell.id === channelID);
            channel.send({embeds: [logEmbed]})
        }
}