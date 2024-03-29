const cron = require('node-cron');
const ReminderStore = require("../reminderStore");

module.exports = {
    execute(client) {
        cron.schedule('* * * * *', async () => {
            try {
                const now = new Date(new Date().toLocaleString('ja-JP', {timeZone: 'Asia/Tokyo'}));
                const newData = [];
                const data = ReminderStore.getAllData();

                for (let i = 0; i < data.length; ++i) {
                    if (now < data[i].limit) {
                        newData.push(data[i]);
                        continue;
                    }

                    const channel = client.channels.cache.get(data[i].channel);
                    const message = await channel.messages.fetch(data[i].messageId)
                        .catch(err => console.error(err));

                    const replyMessage = `<@${data[i].target}> **${data[i].desc}** の時間になりました`;
                    if (message) {
                        message.reply(replyMessage);
                    } else {
                        channel.send(replyMessage);
                    }
                }

                ReminderStore.setAllData(newData)
            } catch (e) {
                console.error(e);
            }
        }, {scheduled: true, timezone:'Asia/Tokyo'});
    }
}
