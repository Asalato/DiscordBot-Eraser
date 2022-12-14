const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('instant')
        .setDescription('このチャンネルの過去の投稿を消します')
        .addIntegerOption(option =>
            option.setName('個数')
                .setDescription('何個消すか')
                .setRequired(true)
                .setMinValue(2)
                .setMaxValue(99)),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        await interaction.deferReply();

        try {
            const amount = interaction.options.getInteger('個数');
            const maxAmount = await interaction.channel.messages.fetch({limit:99}).then(messages => messages.size);

            const targetAmount = Math.min(amount, maxAmount);

            await interaction.channel.bulkDelete(targetAmount + 1);

            await interaction.channel.send(`${interaction.channel.name} に投稿されたメッセージを ${targetAmount}個 削除しました。`);
        } catch (error) {
            console.error(error);
            await interaction.editReply("何故かコマンドの実行に失敗しました");
        }
    },
};
