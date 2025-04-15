const fs = require('node:fs');
const path = require("node:path");

let data = {};
const fileName = './data/.eraseTargetStore';

module.exports = class GuildStore {
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
            return;
        }

        data = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    }

    static async getAllIds() {
        if (data.length === 0) this.#load();
        // eraseTargetStoreのデータからギルドIDのリストを抽出
        return Object.keys(data);
    }

    static async setId(id) {
        if (data.length === 0) this.#load();
        // データにギルドIDが存在しない場合は空の配列で初期化
        if (!data.hasOwnProperty(id)) {
            data[id] = [];
            this.#save();
            console.log(`Add new Guild Id: ${id}`);
        }
    }
}
