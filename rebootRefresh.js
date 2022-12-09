const EraseTargetStore = require("./eraseTargetStore");
const {fetchAllMessages} = require("./utils");

const limit = 30 * 60 * 1000;

module.exports = {
    rebootRefresh: async (client) => {
        const data = EraseTargetStore.getAllData()
        Object.keys(data).forEach(guildId => {
            const guild = client.guilds.cache.get(guildId);

            data[guildId].forEach(async channelId => {
                const channel = guild.channels.fetch(channelId);
                const messages = await fetchAllMessages(channel);
                messages.forEach(message => {
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
            });
        })
    }
}
