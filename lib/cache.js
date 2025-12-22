/**
 * Simple in-memory cache for API responses
 * Reduces redundant API calls and improves performance
 */

class Cache {
  constructor() {
    this.store = new Map();
  }

  /**
   * Get cached value if not expired
   * @param {string} key - Cache key
   * @returns {any|null} Cached value or null if expired/missing
   */
  get(key) {
    const item = this.store.get(key);

    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Set cache value with TTL
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds (default: 5 minutes)
   */
  set(key, value, ttl = 5 * 60 * 1000) {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttl,
    });
  }

  /**
   * Delete specific cache entry
   * @param {string} key - Cache key
   */
  delete(key) {
    this.store.delete(key);
  }

  /**
   * Delete all cache entries matching pattern
   * @param {RegExp|string} pattern - Pattern to match keys
   */
  deletePattern(pattern) {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

    for (const key of this.store.keys()) {
      if (regex.test(key)) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Clear all cache entries
   */
  clear() {
    this.store.clear();
  }

  /**
   * Get cache size
   * @returns {number} Number of cached items
   */
  size() {
    return this.store.size;
  }

  /**
   * Clean up expired entries
   */
  cleanup() {
    const now = Date.now();

    for (const [key, item] of this.store.entries()) {
      if (now > item.expiresAt) {
        this.store.delete(key);
      }
    }
  }
}

// Singleton instance
const cache = new Cache();

// Cleanup expired entries every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    cache.cleanup();
  }, 10 * 60 * 1000);
}

export default cache;
