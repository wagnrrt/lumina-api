import type { FastifyInstance } from 'fastify'
import { weatherRoutes } from './weatherRoutes'

export async function registerRoutes(server: FastifyInstance) {
  await server.register(weatherRoutes)
}
