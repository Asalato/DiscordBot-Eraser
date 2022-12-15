const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const ReminderStore = require("../reminderStore");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reminder')
        .setDescription('リマインドするやつ')
        .addStringOption(option =>
            option.setName('内容')
                .setDescription('何をリマインドしてほしいか')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('時間')
                .setDescription('何時間後にリマインドしてほしいか')
                .setRequired(true)
                .setMinValue(0))
        .addIntegerOption(option =>
            option.setName('分')
                .setDescription('何分後にリマインドしてほしいか')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(59))
        .addUserOption(option =>
            option.setName('ターゲット')
                .setDescription('誰にリマインドするか')),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const desc = interaction.options.getString('内容');
        const hour = interaction.options.getInteger('時間');
        const minutes = interaction.options.getInteger('分');
        let target = interaction.options.getUser('ターゲット');

        if (!target) {
            target = interaction.user;
        }

        const targetDate = new Date(new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));
        targetDate.setHours(targetDate.getHours() + hour);
        targetDate.setMinutes(targetDate.getMinutes() + minutes);

        const message = `**${target.username}** に対し、 **${targetDate.getHours()}:${targetDate.getMinutes()}** に **${desc}** をリマインドします`;
        const reply = await interaction.reply({content: message, fetchReply: true});

        await ReminderStore.addData(interaction.channelId, target.id, targetDate, desc, reply.id);
    },
};
