const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('instant')
        .setDescription('このチャンネルの過去の投稿を消します')
        .addIntegerOption(option =>
            option.setName('個数')
                .setDescription('何個消すか')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        await interaction.deferReply();

        try {
            const amount = interaction.options.getInteger('個数');
            await interaction.channel.bulkDelete(amount);

            await interaction.channel.send(`${interaction.channel.name} に投稿されたメッセージを ${amount}個 削除しました。`);
        } catch (error) {
            console.error(error);
            await interaction.editReply("何故かコマンドの実行に失敗しました");
        }
    },
};
