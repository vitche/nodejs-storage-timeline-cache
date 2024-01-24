const StorageTimeline = require("nodejs-storage-timeline");

class StorageTimelineCache {

    _state = {};

    _timeLine;

    constructor(storagePath, schemaName, timeLineName) {

        const storage = new StorageTimeline.Storage(storagePath);
        const schema = storage.get(schemaName);
        this._timeLine = schema.get(timeLineName);
    }

    get(key) {
        return this._state[key];
    }

    set(key, value) {
        this._state[key] = value;
        this._timeLine.add(key, value, () => {
        });
    }

    async load() {

        this._state = {};

        const loaderPromise = () => new Promise(resolve => {

            this._timeLine.nextString((error, item) => {

                if (error || !item) {
                    resolve(false);
                    return;
                }

                if (item) {
                    this._state[item.time] = item.value;
                    resolve(true);
                }
            });
        });

        let loaded;
        do {
        } while (loaded = await loaderPromise());
    }
}

module.exports.load = async (storagePath, schemaName, timeLineName) => {
    const cache = new StorageTimelineCache(storagePath, schemaName, timeLineName);
    await cache.load();
    return cache;
};
