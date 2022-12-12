const EraseTargetStore = require("../eraseTargetStore");

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (!await EraseTargetStore.isTarget(message.guildId, message.channelId)) return;

        setTimeout(() => {
            message.delete();
        }, 30 * 60 * 1000);
    },
};
