import { config } from '../config/enviroments'
import { redisClient } from '../config/redis'

export class CacheService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redisClient.get(key)

      if (!data) {
        return null
      }

      return JSON.parse(data) as T
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value)
      const expirationTime = ttl || config.cache.ttl

      await redisClient.set(key, serialized, { EX: expirationTime })
    } catch (error) {
      console.error('Cache set error:', error)
      throw error
    }
  }

  async del(key: string): Promise<void> {
    try {
      await redisClient.del(key)
    } catch (error) {
      console.error('Cache delete error:', error)
      throw error
    }
  }

  async clear(): Promise<void> {
    try {
      await redisClient.flushDb()
    } catch (error) {
      console.error('Cache clear error:', error)
      throw error
    }
  }
}

export const cacheService = new CacheService()
