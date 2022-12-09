const {SlashCommandBuilder} = require("discord.js");
const EraseTargetStore = require("../eraseTargetStore");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('メッセージ削除の対象となるチャンネルを登録します'),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        await interaction.deferReply();

        try {
            await EraseTargetStore.setChannel(interaction.guildId, interaction.channelId);

            await interaction.editReply(`これから ${interaction.channel.name} に投稿されたメッセージは30分後に削除されます。`);
        } catch (error) {
            console.error(error);
            await interaction.editReply("何故かコマンドの実行に失敗しました");
        }
    },
};
