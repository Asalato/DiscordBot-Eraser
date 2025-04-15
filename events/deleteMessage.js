const EraseTargetStore = require("../eraseTargetStore");

// タイムアウトIDを保存するためのMapを追加
const messageTimeouts = new Map();

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (!await EraseTargetStore.isTarget(message.guildId, message.channelId)) return;

        // 既存のタイムアウトがあれば解除
        if (messageTimeouts.has(message.id)) {
            clearTimeout(messageTimeouts.get(message.id));
        }

        // 新しいタイムアウトを設定し、IDを保存
        const timeoutId = setTimeout(() => {
            message.delete().catch(err => console.error(`Failed to delete message: ${err}`));
            messageTimeouts.delete(message.id); // 削除後、Mapからも削除
        }, 30 * 60 * 1000);
        
        messageTimeouts.set(message.id, timeoutId);
    },
};
