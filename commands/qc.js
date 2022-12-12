const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qc')
        .setDescription('Qcが出ます'),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        await interaction.deferReply();

        await interaction.editReply({files: ["https://qc-collection.s3.ap-northeast-1.amazonaws.com/PXL_20220709_065750249.jpg"]});
    },
};
