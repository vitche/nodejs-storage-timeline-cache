const StorageTimelineCache = require("../index");

(async () => {
    const cache = await StorageTimelineCache.load("../files", "TEST", "TEST");
    cache.set(1, "8-");
    cache.set(2, "8--");
    cache.set(3, "8---");
    cache.set(4, "8----");
    cache.set(5, "8-----");
    cache.set(6, "8------");
    cache.set(8, "8-------");
})();
