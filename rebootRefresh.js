const EraseTargetStore = require("./eraseTargetStore");
const {fetchAllMessages} = require("./utils");

const limit = 30 * 60 * 1000;

// タイムアウトIDを保存するためのMapを追加
const channelTimeouts = new Map();

module.exports = {
    rebootRefresh: async (client) => {
        // 既存のすべてのタイムアウトをクリア
        channelTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        channelTimeouts.clear();
        
        const data = EraseTargetStore.getAllData();
        for (const guildId of Object.keys(data)) {
            try {
                const guild = await client.guilds.fetch(guildId);
                for (const channelId of data[guildId]) {
                    try {
                        const channel = await guild.channels.fetch(channelId);
                        const messages = await fetchAllMessages(channel);
                        messages.forEach(message => {
                            if (!message) return;
                            const diff = new Date() - message.createdAt;
                            if (diff > limit) {
                                message.delete().catch(err => console.error(`Failed to delete message: ${err}`));
                            } else {
                                const timeoutId = setTimeout(() => {
                                    message.delete().catch(err => console.error(`Failed to delete message: ${err}`));
                                    channelTimeouts.delete(`${message.channelId}-${message.id}`);
                                }, limit - diff);
                                channelTimeouts.set(`${message.channelId}-${message.id}`, timeoutId);
                            }
                        });

                        console.log(`Update deletion status at Channel-${channelId} at Guild-${guildId}`);
                    } catch (err) {
                        console.error(`Error processing channel ${channelId}: ${err}`);
                    }
                }
            } catch (err) {
                console.error(`Error processing guild ${guildId}: ${err}`);
            }
        }
        
        // 大きなデータ処理後、ガベージコレクションのヒント
        if (global.gc) {
            global.gc();
        }
    }
}
