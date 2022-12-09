const {trySimpleReplyWhenContainsArray} = require("../utils");
const EraseTargetStore = require("../eraseTargetStore");

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (message.author.bot) return false;
        if (message.mentions.users.size > 0 && !message.mentions.has(client.user)) return false;

        if (!await EraseTargetStore.isTarget(message.guildId, message.channelId)) return;

        setTimeout(() => {
            message.delete();
        }, 30 /* 60*/ * 1000);
    },
};
