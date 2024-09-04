const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Botun pingini gösterir.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

        interaction.reply({ content: `Gecikmem \`${interaction.client.ws.ping}\`ms`});
    }
}