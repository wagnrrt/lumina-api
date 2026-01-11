import { weatherService } from '@/service/weatherService'
import { WeatherQueryParams } from '@/types/weather'
import type { FastifyRequest, FastifyReply } from 'fastify'

export class WeatherController {
  async getWeather(request: FastifyRequest, reply: FastifyReply) {
    const { location } = request.query as WeatherQueryParams

    try {
      const data = await weatherService.getWeather(location)
      return reply.send(data)
    } catch (error) {
      console.error('Controller error:', error)

      return reply.status(500).send({
        error: 'Internal Server Error',
        message: 'Failed to fetch weather data',
      })
    }
  }
}

export const weatherController = new WeatherController()
