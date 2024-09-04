const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

let snipedMessage = null;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('Son silinen mesajı gösterir.'),
    async execute(interaction) {

        if (!snipedMessage) {
            const noDel = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`Bir mesaj silinmemiş`)
            .setTimestamp()
            interaction.reply({embeds: [noDel]});
        }

        if (snipedMessage) {
            const snipeEmbed = new EmbedBuilder()
                .setColor('Random')
                .setDescription(`İşte silinen son mesaj:\n\n**Mesaj:** \`${snipedMessage.content}\`\n**Mesaj Sahibi:** ${snipedMessage.author}\n**Silinme Tarihi:** ${snipedMessage.createdAt.toLocaleString()}\n**Kanal:** ${snipedMessage.channel}`)
                .setTimestamp()
                .setFooter({ text: 'Bir mesaj silinmiş | Snipe', iconURL: snipedMessage.author.displayAvatarURL() });
            await interaction.reply({embeds: [snipeEmbed]});
        } else {
            await interaction.reply('Silinen mesaj bulunamadı.');
        }
    },
    setSnipedMessage(message) {
        snipedMessage = message;
    }
};