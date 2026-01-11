import { config } from '../config/enviroments'
import { RawWeatherResponse } from '../types/weather'

export class WeatherApiService {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = config.weatherApi.baseUrl
    this.apiKey = config.weatherApi.key
  }

  async fetchWeatherData(location: string): Promise<RawWeatherResponse> {
    if (!this.apiKey) {
      throw new Error('Weather API key is not configured')
    }

    const url = `${this.baseUrl}/${encodeURIComponent(location)}`

    const params = new URLSearchParams({
      key: this.apiKey,
      unitGroup: config.weatherApi.unitGroup,
      include: 'days,hours,current',
      lang: config.weatherApi.language,
    })

    try {
      const response = await fetch(`${url}?${params.toString()}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Weather API Error:', {
          status: response.status,
          body: errorText,
          location,
        })
        throw new Error(`Weather API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json() as RawWeatherResponse
      return data
    } catch (error) {
      console.error('Weather API fetch error:', error)
      throw error
    }
  }
}

export const weatherApiService = new WeatherApiService()
