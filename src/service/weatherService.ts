import { weatherApiService } from './weatherApiService'
import { cacheService } from './cacheService'
import { NormalizedWeatherData, RawWeatherResponse } from '../types/weather'

export class WeatherService {
  private normalizeWeatherData(raw: RawWeatherResponse): NormalizedWeatherData {
    return {
      resolvedAddress: raw.resolvedAddress ?? '',

      // Current conditions
      temperature: raw.currentConditions?.temp ?? 0,
      feelslike: raw.currentConditions?.feelslike ?? 0,
      condition: raw.currentConditions?.conditions ?? '',
      description: raw.currentConditions?.description ?? '',
      icon: raw.currentConditions?.icon ?? '',

      // Hoje
      high: raw.days?.[0]?.tempmax ?? 0,
      low: raw.days?.[0]?.tempmin ?? 0,

      // Vento
      windSpeed: raw.currentConditions?.windspeed ?? 0,
      windGust: raw.currentConditions?.windgust ?? 0,
      windDir: raw.currentConditions?.winddir ?? 0,

      // Precipitação
      precip: raw.currentConditions?.precip ?? 0,
      precipProb: raw.currentConditions?.precipprob ?? 0,
      precipProbDay: raw.days?.[0]?.precipprob ?? 0,
      precipType: raw.days?.[0]?.preciptype ?? null,
      snow: raw.days?.[0]?.snow ?? 0,
      snowDepth: raw.days?.[0]?.snowdepth ?? 0,

      // Atmosfera
      humidity: raw.currentConditions?.humidity ?? 0,
      pressure: raw.currentConditions?.pressure ?? 0,
      visibility: raw.currentConditions?.visibility ?? 0,
      cloudCover: raw.currentConditions?.cloudcover ?? 0,
      dew: raw.currentConditions?.dew ?? 0,
      uvIndex: raw.currentConditions?.uvindex ?? 0,

      // Solar
      solarRadiation: raw.currentConditions?.solarradiation ?? 0,
      solarEnergy: raw.currentConditions?.solarenergy ?? 0,

      // Sol e lua
      sunrise: raw.currentConditions?.sunrise ?? '',
      sunset: raw.currentConditions?.sunset ?? '',
      moonPhase: raw.currentConditions?.moonphase ?? 0,

      // Previsões horárias
      hourly: raw.days?.[0]?.hours?.map(h => ({
        time: h.datetime,
        epoch: h.datetimeEpoch,
        temp: h.temp,
        feelslike: h.feelslike ?? h.temp,
        condition: h.conditions,
        icon: h.icon ?? '',
        precipProb: h.precipprob ?? 0,
        precipType: h.preciptype ?? null,
        windSpeed: h.windspeed ?? 0,
        windGust: h.windgust ?? 0,
        humidity: h.humidity ?? 0,
        cloudCover: h.cloudcover ?? 0,
        uvIndex: h.uvindex ?? 0,
        visibility: h.visibility ?? 0,
      })) ?? [],

      // Previsões diárias
      daily: raw.days?.map(d => ({
        day: d.datetime,
        epoch: d.datetimeEpoch,
        high: d.tempmax,
        low: d.tempmin,
        temp: d.temp,
        feelslikeMax: d.feelslikemax ?? d.tempmax,
        feelslikeMin: d.feelslikemin ?? d.tempmin,
        condition: d.conditions,
        description: d.description ?? '',
        icon: d.icon ?? '',
        precipProb: d.precipprob ?? 0,
        precipCover: d.precipcover ?? 0,
        precipType: d.preciptype ?? null,
        snow: d.snow ?? 0,
        windSpeed: d.windspeed ?? 0,
        windGust: d.windgust ?? 0,
        humidity: d.humidity ?? 0,
        uvIndex: d.uvindex ?? 0,
        sunrise: d.sunrise ?? '',
        sunset: d.sunset ?? '',
        moonPhase: d.moonphase ?? 0,
        severeRisk: d.severerisk ?? 0,
        pressure: d.pressure ?? 0,
        cloudCover: d.cloudcover ?? 0,
        visibility: d.visibility ?? 0,
        hours: d.hours?.map(h => ({
          time: h.datetime,
          epoch: h.datetimeEpoch,
          temp: h.temp,
          feelslike: h.feelslike ?? h.temp,
          condition: h.conditions,
          icon: h.icon ?? '',
          precipProb: h.precipprob ?? 0,
          precipType: h.preciptype ?? null,
          windSpeed: h.windspeed ?? 0,
          windGust: h.windgust ?? 0,
          humidity: h.humidity ?? 0,
          cloudCover: h.cloudcover ?? 0,
          uvIndex: h.uvindex ?? 0,
          visibility: h.visibility ?? 0,
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
