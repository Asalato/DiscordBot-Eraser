const fs = require('fs');

let data = null;
const fileName = 'data/.eraseTargetStore';

module.exports = class EraseTargetStore {
    static #save() {
        fs.writeFileSync(fileName, JSON.stringify(data));
    }

    static #load() {
        if (!fs.existsSync(fileName)) {
            data = {};
            return;
        }

        data = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    }

    static async isTarget(guildId, channelId) {
        if (data == null) this.#load();
        if (!data.hasOwnProperty(guildId)) return false;
        return data[guildId].includes(channelId);
    }

    static async setChannel(guildId, channelId) {
        if (data == null) this.#load();

        let guildData = [];
        if (data.hasOwnProperty(guildId)) {
            guildData = data[guildId];
        }
        guildData.push(channelId);
        data[guildId] = guildData;

        this.#save();
        console.log(`Add new Channel Id: ${channelId}`);
    }

    static async deleteChannel(guildId, channelId) {
        if (data == null) this.#load();
        if (!data.hasOwnProperty(guildId)) return;
        let guildData = data[guildId];
        guildData = guildData.filter(id => id !== channelId);
        data[guildId] = guildData

        this.#save();
        console.log(`Delete Channel Id: ${channelId}`);
    }
}
