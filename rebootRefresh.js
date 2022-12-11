const EraseTargetStore = require("./eraseTargetStore");
const {fetchAllMessages} = require("./utils");

const limit = 30 * 60 * 1000;

module.exports = {
    rebootRefresh: async (client) => {
        const data = EraseTargetStore.getAllData();
        for (const guildId of Object.keys(data)) {
            const guild = await client.guilds.fetch(guildId);
            for (const channelId of data[guildId]) {
                const channel = await guild.channels.fetch(channelId);
                const messages = await fetchAllMessages(channel);
                messages.forEach(message => {
                    if (!message) return;
                    const diff = new Date() - message.createdAt;
                    if (diff > limit) {
                        message.delete();
                    } else {
                        setTimeout(() => {
                            message.delete();
                        }, limit - diff);
                    }
                });

                console.log(`Update deletion status at Channel-${channelId} at Guild-${guildId}`);
            }
        }
    }
}
