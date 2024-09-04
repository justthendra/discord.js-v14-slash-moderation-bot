const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require('../../config.json')

function parseDuration(duration) {
    const regex = /(\d+)([smhd])/;
    const matches = duration.match(regex);

    if (!matches) return null;

    const [, value, unit] = matches;

    switch (unit) {
        case 's':
            return parseInt(value);
        case 'm':
            return parseInt(value) * 60;
        case 'h':
            return parseInt(value) * 60 * 60;
        case 'd':
            return parseInt(value) * 60 * 60 * 24;
        default: 
        return null;
    }
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Bir kullanıcıya zamanaşımı uygulayın.')
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .addUserOption(user =>
        user.setName('kullanıcı')
        .setDescription('Kullanıcıyı belirtin.')
        .setRequired(true))
    .addStringOption(duration => 
        duration.setName('süre')
        .setDescription('Süre belirtin. (30m, 1h, 2h)')
        .setRequired(true)),
    async execute(interaction) {

        const user = interaction.options.getMember('kullanıcı')
        const durationString = interaction.options.getString('süre')
        const duration = parseDuration(durationString);

        const muteEmbed = new EmbedBuilder()
        .setTitle('Discord.js v14 Moderasyon')
        .setAuthor({name: "Bir kullancıya zamanaşımı uygulandı."})
        .setDescription(`${user} isimli kullancıya zamanaşımı uygulandı.\Süre: \`${durationString}\``)
        .setColor(config.embeds.colorSuccessfull)
        .setTimestamp()
        .setFooter({text: "Discord.js v14 Moderasyon Bot | Zamanaşımı", iconURL: interaction.client.user.displayAvatarURL()})
        .setURL("https://github.com/justthendra/discord.js-v14-slash-moderation-bot")
        interaction.reply({embeds: [muteEmbed]})
        await user.timeout(duration * 1000)
        

        const logEmbed = new EmbedBuilder()
        .setTitle('Discord.js v14 Moderasyon')
        .setAuthor({name: "Bir kullancıya zamanaşımı uygulandı."})
        .setDescription(`${user} isimli kullancıya zamanaşımı uygulandı.\n**Süre:** \`${durationString}\`\n**Yetkili:** ${interaction.user}`)
        .setColor(config.embeds.colorSuccessfull)
        .setTimestamp()
        .setFooter({text: "Discord.js v14 Moderasyon Bot | Zamanaşımı", iconURL: interaction.client.user.displayAvatarURL()})
        .setURL("https://github.com/justthendra/discord.js-v14-slash-moderation-bot")

        const channelID = config.guild.channels.modlog;
        const channel = interaction.guild.channels.cache.find(channell => channell.id === channelID)
        channel.send({embeds: [logEmbed]})
    }
}
