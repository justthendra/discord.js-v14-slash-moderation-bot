const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('move')
    .setDescription('Bir kullanıcıyı belirtilen ses kanalına taşır.')
    .addUserOption(option => 
        option.setName('kullanıcı')
        .setDescription('Bir kullanıcı seçin.')
        .setRequired(true))
    .addChannelOption(channel =>
        channel.setName('kanal')
        .setDescription('Bir ses kanalı seçin.')
        .setRequired(true)),
    async execute(interaction) {
    
    const user = interaction.options.getMember("kullanıcı");
    const channel = interaction.options.getChannel("kanal");

    const movedEmbed = new EmbedBuilder()
      .setAuthor({
        name: "Bir kullanıcı taşındı.",
        iconURL: user.user.displayAvatarURL(),
      })
      .setDescription(`${kullanıcı} adlı kullanıcı ${kanal} adlı ses kanalına taşındı.`)
      .setColor("Random")
      .setFooter({
        text: "Discord.js v14 Moderasyon Bot | Kullanıcı Taşıma",
        iconURL: interaction.client.user.displayAvatarURL(),
      })
      .setTimestamp();
    interaction.reply({ embeds: [movedEmbed] });

    user.voice.setChannel(channel);
    
    
    }
}