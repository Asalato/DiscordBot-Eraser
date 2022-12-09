const {SlashCommandBuilder} = require("discord.js");
const EraseTargetStore = require("../eraseTargetStore");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unregister')
        .setDescription('メッセージ削除の対象となるチャンネルの登録を解除します'),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        await interaction.deferReply();

        try {
            await EraseTargetStore.deleteChannel(interaction.guildId, interaction.channelId);

            await interaction.editReply(`${interaction.channel.name} に投稿されたメッセージの削除をやめました。`);
        } catch (error) {
            console.error(error);
            await interaction.editReply("何故かコマンドの実行に失敗しました");
        }
    },
};
