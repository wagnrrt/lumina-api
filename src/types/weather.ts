// Raw types (o que vem da API)
export interface RawWeatherHour {
  datetime: string
  temp: number
  feelslike?: number
  conditions: string
  icon?: string
  precipprob?: number
}

export interface RawWeatherDay {
  datetime: string
  tempmax: number
  tempmin: number
  temp: number
  feelslikemax?: number
  feelslikemin?: number
  conditions: string
  description?: string
  icon?: string
  precipprob?: number
  snow?: number
  windspeed?: number
  windgust?: number
  humidity?: number
  uvindex?: number
  visibility?: number
  pressure?: number
  cloudcover?: number
  sunrise?: string
  sunset?: string
  moonphase?: number
  severerisk?: number
  hours?: RawWeatherHour[]
}

export interface RawWeatherResponse {
  resolvedAddress?: string
  days?: RawWeatherDay[]
}

// Normalized types (o que você retorna)
export interface NormalizedWeatherHour {
  time: string
  temp: number
  feelslike: number
  precipProb: number
  icon: string
}

export interface NormalizedWeatherDay {
  icon: string
  condition: string
  description: string
  temp: number
  high: number
  low: number
  feelslikeMax: number
  feelslikeMin: number
  precipProb: number
  snow: number
  windSpeed: number
  windGust: number
  humidity: number
  uvIndex: number
  visibility: number
  pressure: number
  cloudCover: number
  sunrise: string
  sunset: string
  moonPhase: number
  severeRisk: number
  hours: NormalizedWeatherHour[]
}

export interface NormalizedWeatherData {
  resolvedAddress: string
  daily: NormalizedWeatherDay[]
}

export interface WeatherQueryParams {
  location: string
}
