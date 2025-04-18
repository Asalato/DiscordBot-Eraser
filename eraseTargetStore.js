const fs = require('node:fs');
const path = require("node:path");

let data = {};
const fileName = './data/.eraseTargetStore';

module.exports = class EraseTargetStore {
    static #save() {
        const dirName = path.dirname(fileName);
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, {recursive: true});
        }
        fs.writeFileSync(fileName, JSON.stringify(data));
    }

    static #load() {
        if (!fs.existsSync(fileName)) {
            data = {};
            console.log(`No data file found at ${fileName}. Creating a new one.`);
            this.#save();
            return;
        }

        data = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    }

    static getAllData() {
        if (data.length === 0) this.#load();
        return data;
    }

    static async isTarget(guildId, channelId) {
        if (data.length === 0) this.#load();
        if (!data.hasOwnProperty(guildId)) return false;
        return data[guildId].includes(channelId);
    }

    static async setChannel(guildId, channelId) {
        if (data.length === 0) this.#load();

        let guildData = [];
        if (data.hasOwnProperty(guildId)) {
            guildData = data[guildId];
        }
        if (!guildData.includes(channelId)) {
            guildData.push(channelId);
        }
        data[guildId] = guildData;

        this.#save();
        console.log(`Add new Channel Id: ${channelId}`);
    }

    static async deleteChannel(guildId, channelId) {
        if (data.length === 0) this.#load();
        if (!data.hasOwnProperty(guildId)) return;
        let guildData = data[guildId];
        guildData = guildData.filter(id => id !== channelId);
        data[guildId] = guildData

        this.#save();
        console.log(`Delete Channel Id: ${channelId}`);
    }
}
