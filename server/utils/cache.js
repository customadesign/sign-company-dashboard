const redis = require('redis');

class CacheService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.inMemoryCache = new Map();
    this.initRedis();
  }

  async initRedis() {
    try {
      if (process.env.REDIS_URL) {
        this.client = redis.createClient({
          url: process.env.REDIS_URL
        });

        this.client.on('error', (err) => {
          console.log('Redis Client Error:', err);
          this.connected = false;
        });

        this.client.on('connect', () => {
          console.log('Redis Client Connected');
          this.connected = true;
        });

        await this.client.connect();
      } else {
        console.log('Redis URL not provided, using in-memory cache');
      }
    } catch (error) {
      console.error('Failed to initialize Redis:', error);
      console.log('Falling back to in-memory cache');
    }
  }

  async get(key) {
    try {
      if (this.connected && this.client) {
        const value = await this.client.get(key);
        return value;
      } else {
        // Fallback to in-memory cache
        const cached = this.inMemoryCache.get(key);
        if (cached && cached.expiry > Date.now()) {
          return cached.value;
        }
        this.inMemoryCache.delete(key);
        return null;
      }
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key, value, ttlSeconds = 900) {
    try {
      if (this.connected && this.client) {
        await this.client.setEx(key, ttlSeconds, value);
      } else {
        // Fallback to in-memory cache
        this.inMemoryCache.set(key, {
          value,
          expiry: Date.now() + (ttlSeconds * 1000)
        });
        
        // Clean up expired entries periodically
        this.cleanupInMemoryCache();
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async delete(key) {
    try {
      if (this.connected && this.client) {
        await this.client.del(key);
      } else {
        this.inMemoryCache.delete(key);
      }
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async clear() {
    try {
      if (this.connected && this.client) {
        await this.client.flushAll();
      } else {
        this.inMemoryCache.clear();
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  cleanupInMemoryCache() {
    const now = Date.now();
    for (const [key, cached] of this.inMemoryCache.entries()) {
      if (cached.expiry <= now) {
        this.inMemoryCache.delete(key);
      }
    }
  }

  // Clean up in-memory cache every 5 minutes
  startCleanupInterval() {
    setInterval(() => {
      this.cleanupInMemoryCache();
    }, 5 * 60 * 1000);
  }
}

// Create singleton instance
const cacheService = new CacheService();
cacheService.startCleanupInterval();

module.exports = cacheService;