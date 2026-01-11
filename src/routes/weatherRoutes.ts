import type { FastifyInstance } from 'fastify'
import { weatherController } from '../controllers/weatherController'
import { validateLocation } from '../validators/weatherValidator'

export async function weatherRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      preHandler: validateLocation,
    },
    weatherController.getWeather.bind(weatherController)
  )
}
