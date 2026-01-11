import { createClient } from 'redis'
import { config } from './enviroments'

export const redisClient = createClient({
  socket: {
    host: config.redis.host,
    port: config.redis.port,
  },
  password: config.redis.password,
})

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err)
})

redisClient.on('connect', () => {
  console.log('Redis connected successfully')
})

export async function connectRedis() {
  try {
    await redisClient.connect()
    console.log('Redis connection established')
  } catch (error) {
    console.error('Failed to connect to Redis:', error)
    throw error
  }
}

export async function disconnectRedis() {
  try {
    await redisClient.quit()
    console.log('Redis disconnected')
  } catch (error) {
    console.error('Failed to disconnect Redis:', error)
  }
}
