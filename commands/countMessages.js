const {SlashCommandBuilder} = require("discord.js");
const {fetchAllMessages} = require("../utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('count')
        .setDescription('チャンネルで流れたメッセージの数を数えます！仕事しろ？'),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        await interaction.deferReply();
        const messages = await fetchAllMessages(interaction.channel);
        const replyMessage = `${interaction.channel.name} の投稿はは全部で ${messages.length}件でした。`;
        await interaction.deleteReply();
        await interaction.followUp({content: replyMessage});
    },
};
