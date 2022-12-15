const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('投票したくなるやつ')
        .addStringOption(option =>
            option.setName('内容')
                .setDescription('投票の議題')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('選択肢1')
                .setDescription('選択肢1の内容')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('選択肢2')
                .setDescription('選択肢2の内容')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('選択肢3')
                .setDescription('選択肢3の内容')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('選択肢4')
                .setDescription('選択肢4の内容')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const desc = interaction.options.getString('内容');
        const option1 = interaction.options.getString('選択肢1');
        const option2 = interaction.options.getString('選択肢2');
        const option3 = interaction.options.getString('選択肢3');
        const option4 = interaction.options.getString('選択肢4');

        let replyMessage = `<@${interaction.user.id}> が投票を開始しました`;

        let descriptions = "";
        if (option2 || option3 || option4) descriptions += `1⃣　${option1}`;
        else descriptions += `✅　${option1}`;
        if (option2) descriptions += `\n2⃣　${option2}`;
        if (option3) descriptions += `\n3⃣　${option3}`;
        if (option4) descriptions += `\n4⃣　${option4}`;
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(desc)
            .setDescription(descriptions);

        const reply = await interaction.reply({content: replyMessage, embeds: [embed], fetchReply: true});
        if (option2 || option3 || option4) await reply.react('1⃣');
        else await reply.react('✅');
        if (option2) await reply.react('2⃣');
        if (option3) await reply.react('3⃣');
        if (option4) await reply.react('4⃣');
    },
};
