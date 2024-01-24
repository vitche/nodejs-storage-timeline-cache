# Node.js `Storage.Timeline` Cache

This component provides an in-memory cache that is loaded from and synced to a `Storage.Timeline` persistent storage.

The cache key is the `time` value and the cache value is the `value` (event) in the storage timeline.

## Usage

```js
const StorageTimelineCache = require("nodejs-storage-timeline-cache");

(async () => {

  // Load cache data from files/TEST/TEST storage timeline
  const cache = await StorageTimelineCache.load("./files", "TEST", "TEST");
  
  // Set cache values
  cache.set(1, "Event 1"); 
  cache.set(2, "Event 2");

  // Get cache values
  console.log(cache.get(1)); // "Event 1"
  
  // Cache syncs updated data to storage timeline
})();
```

The `load()` method creates an instance of the `StorageTimelineCache` class.

The cache is loaded asynchronously from the storage timeline.

Set and get methods interface with the in-memory cache. Updated values are synced back to storage.

## Caching Storage Timelines

This cache is useful for fast read access to storage timelines across processes. Writes are still persisted to storage.

Some example uses:

- Cache recent telemetry data;
- Cache latest alert events;
- Cache latest user activity.

## Sample Project

This repository contains a sample project for testing the cache.

See [tests/cache.js](tests/cache.js) for example usage.

It loads data (or creates a new entry) from `files/TEST/TEST` and sets some sample values.
