const fs = require('node:fs');
const path = require("node:path");

let data = null;
const fileName = './data/.reminderStore';

module.exports = class ReminderStore {
    static #save() {
        const dirName = path.dirname(fileName);
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, {recursive: true});
        }
        fs.writeFileSync(fileName, JSON.stringify(data));
    }

    static #load() {
        if (!fs.existsSync(fileName)) {
            data = [];
            return;
        }

        data = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    }

    static getAllData() {
        if (data == null) this.#load();
        return data;
    }

    static setAllData(newData) {
        data = newData;
        this.#save();
    }

    static async addData(channelId, targetUserId, limit, description, messageId) {
        if (data == null) this.#load();
        data.push({
            channel: channelId,
            target: targetUserId,
            limit: limit,
            desc: description,
            messageId: messageId
        });

        this.#save();
        console.log(`Add reminder`);
    }
}
