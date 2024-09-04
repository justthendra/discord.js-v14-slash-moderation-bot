const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Komutları gösterir."),
    async execute(interaction) {


        const helpEmb = new EmbedBuilder()
        .setAuthor({ name: `Yardım Menüsü`, iconURL: interaction.client.user.displayAvatarURL() })
        .setColor(config.embeds.colorBot)
        .setDescription(`Aşağıdaki butonlardan kategorilere göz atabilirsiniz.`)
        .setFooter({ text: `Discord.js V14 Moderasyon Bot | Yardım`, iconURL: interaction.client.user.displayAvatarURL()})
        .setTimestamp()

        const button1 = new ButtonBuilder()
        .setLabel("Botu Davet Et")
        .setURL(config.bot.invite)
        .setStyle(ButtonStyle.Link);

        const button2 = new ButtonBuilder()
        .setLabel("Genel Komutlar")
        .setCustomId('general')
        .setStyle(ButtonStyle.Success);

        const button3 = new ButtonBuilder()
        .setLabel("Moderasyon Komutları")
        .setCustomId('moderation')
        .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
        .addComponents(button1, button2, button3);
        const initialResponse = await interaction.reply({ embeds: [helpEmb], components: [row], fetchReply: true });

        const filter = i => i.customId === 'general' || i.customId === 'moderation';
        const collector = initialResponse.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'general') {
                const genEmb = new EmbedBuilder()
                .setAuthor({ name: "Yardım Menüsü", iconURL: interaction.client.user.displayAvatarURL() })
                .addFields(
                    { name: "Ping", value: "Botun gecikmesini gösterir.", inline: true },
                )
                .setColor(config.embeds.colorBot)
                .setDescription("Genel komutları aşağıya sıraladım")
                .setFooter({ text: "Discord.js V14 Moderasyon Botu | Yardım", iconURL: interaction.client.user.displayAvatarURL()})
                .setTimestamp()

                await i.update({ embeds: [genEmb], components: initialResponse.components });
            } 
            if (i.customId === 'moderation') {
               const modEmb = new EmbedBuilder()
                .setAuthor({ name: "Yardım Menüsü", iconURL: interaction.client.user.displayAvatarURL() })
                .addFields(
                    { name: "Ban/Unban", value: "Bir kullanıcıyı yasaklar veya yasağını kaldırırsınız.", inline: true },
                    { name: "Kick", value: "Bir kullanıcıyı sunucudan atarsınız.", inline: true },
                    { name: "Timeout", value: "Bir kullanıcıya zamanaşımı uygularsınınz.", inline: true },
                    { name: "Slowmode", value: "Bir kanalda yavaş modu açar/kapatırsınız.", inline: true },
                    { name: "Move", value: "Bir kullanıcıyı başka bir kanala taşırsınınız.", inline: true },
                    { name: "Otorol", value: "Otorol sistemini ayarlarsınız.", inline: true },
                    { name: "Clear", value: "Belirtilen sayıda mesaj silersiniz.", inline: true },
                    { name: "Lock/Unlock", value: "Kanalı kilitler/açarsınız.", inline: true },
                    { name: "Role", value: "Bir kullanıcıdan belirttiğiniz rolü verir/alırsınız.", inline: true },
                    { name: "Nick", value: "Bir kullanıcının adını değiştirirsiniz.", inline: true },
                )
                .setColor(config.embeds.colorBot)
                .setDescription("Moderasyon komutlarını aşağıya sıraladım.")
                .setFooter({ text: "Discord.js V14 Moderasyon Botu | Yardım", iconURL: interaction.client.user.displayAvatarURL()})
                .setTimestamp()

                await i.update({ embeds: [modEmb], components: initialResponse.components });
            }
            
        });

        collector.on('end', collected => console.log(`-`));
    }
}