import { weatherApiService } from './weatherApiService'
import { cacheService } from './cacheService'
import { NormalizedWeatherData, RawWeatherResponse } from '../types/weather'

export class WeatherService {
  private normalizeWeatherData(raw: RawWeatherResponse): NormalizedWeatherData {
    return {
      resolvedAddress: raw.resolvedAddress ?? '',
      daily: raw.days?.map(d => ({
        icon: d.icon ?? '',
        condition: d.conditions,
        description: d.description ?? '',
        temp: d.temp,
        high: d.tempmax,
        low: d.tempmin,
        feelslikeMax: d.feelslikemax ?? d.tempmax,
        feelslikeMin: d.feelslikemin ?? d.tempmin,
        precipProb: d.precipprob ?? 0,
        snow: d.snow ?? 0,
        windSpeed: d.windspeed ?? 0,
        windGust: d.windgust ?? 0,
        humidity: d.humidity ?? 0,
        uvIndex: d.uvindex ?? 0,
        visibility: d.visibility ?? 0,
        pressure: d.pressure ?? 0,
        cloudCover: d.cloudcover ?? 0,
        sunrise: d.sunrise ?? '',
        sunset: d.sunset ?? '',
        moonPhase: d.moonphase ?? 0,
        severeRisk: d.severerisk ?? 0,
        hours: d.hours?.map(h => ({
          time: h.datetime,
          temp: h.temp,
          feelslike: h.feelslike ?? h.temp,
          precipProb: h.precipprob ?? 0,
          icon: h.icon ?? '',
        })) ?? [],
      })) ?? [],
    }
  }

  async getWeather(location: string): Promise<NormalizedWeatherData> {
    // 1. Tentar obter do cache
    const cached = await cacheService.get<NormalizedWeatherData>(location)

    if (cached) {
      console.log(`Cache hit for location: ${location}`)
      return cached
    }

    console.log(`Cache miss for location: ${location}`)

    // 2. Buscar da API externa
    const rawData = await weatherApiService.fetchWeatherData(location)

    // 3. Normalizar dados
    const normalizedData = this.normalizeWeatherData(rawData)

    // 4. Salvar no cache
    await cacheService.set(location, normalizedData)

    return normalizedData
  }
}

export const weatherService = new WeatherService()
