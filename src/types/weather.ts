export interface RawWeatherConditions {
  datetime?: string
  datetimeEpoch?: number
  temp?: number
  feelslike?: number
  conditions?: string
  description?: string
  icon?: string
  windspeed?: number
  windgust?: number
  winddir?: number
  humidity?: number
  pressure?: number
  visibility?: number
  cloudcover?: number
  dew?: number
  uvindex?: number
  sunrise?: string
  sunriseEpoch?: number
  sunset?: string
  sunsetEpoch?: number
  moonphase?: number
  solarradiation?: number
  solarenergy?: number
  precip?: number
  precipprob?: number
  preciptype?: string[] | null
  snow?: number
  snowdepth?: number
}

export interface RawWeatherHour {
  datetime: string
  datetimeEpoch?: number
  temp: number
  feelslike?: number
  conditions: string
  icon?: string
  windspeed?: number
  windgust?: number
  winddir?: number
  humidity?: number
  pressure?: number
  visibility?: number
  cloudcover?: number
  dew?: number
  uvindex?: number
  precip?: number
  precipprob?: number
  preciptype?: string[] | null
  snow?: number
  snowdepth?: number
}

export interface RawWeatherDay {
  datetime: string
  datetimeEpoch: number
  tempmax: number
  tempmin: number
  temp: number
  feelslikemax?: number
  feelslikemin?: number
  feelslike?: number
  conditions: string
  description?: string
  icon?: string
  windspeed?: number
  windgust?: number
  winddir?: number
  humidity?: number
  pressure?: number
  visibility?: number
  cloudcover?: number
  dew?: number
  uvindex?: number
  precip?: number
  precipprob?: number
  precipcover?: number
  preciptype?: string[] | null
  snow?: number
  snowdepth?: number
  sunrise?: string
  sunriseEpoch?: number
  sunset?: string
  sunsetEpoch?: number
  moonphase?: number
  severerisk?: number
  hours?: RawWeatherHour[]
}

export interface RawWeatherResponse {
  resolvedAddress?: string
  currentConditions?: RawWeatherConditions
  days?: RawWeatherDay[]
}

export interface NormalizedWeatherHour {
  time: string
  epoch?: number
  temp: number
  feelslike: number
  condition: string
  icon: string
  precipProb: number
  precipType: string[] | null
  windSpeed: number
  windGust: number
  humidity: number
  cloudCover: number
  uvIndex: number
  visibility: number
}

export interface NormalizedWeatherDay {
  day: string
  epoch: number
  high: number
  low: number
  temp: number
  feelslikeMax: number
  feelslikeMin: number
  condition: string
  description: string
  icon: string
  precipProb: number
  precipCover: number
  precipType: string[] | null
  snow: number
  windSpeed: number
  windGust: number
  humidity: number
  uvIndex: number
  sunrise: string
  sunset: string
  moonPhase: number
  severeRisk: number
  pressure: number
  cloudCover: number
  visibility: number
  hours: NormalizedWeatherHour[]
}

export interface NormalizedWeatherData {
  resolvedAddress: string
  temperature: number
  feelslike: number
  condition: string
  description: string
  icon: string
  high: number
  low: number
  windSpeed: number
  windGust: number
  windDir: number
  precip: number
  precipProb: number
  precipProbDay: number
  precipType: string[] | null
  snow: number
  snowDepth: number
  humidity: number
  pressure: number
  visibility: number
  cloudCover: number
  dew: number
  uvIndex: number
  solarRadiation: number
  solarEnergy: number
  sunrise: string
  sunset: string
  moonPhase: number
  hourly: NormalizedWeatherHour[]
  daily: NormalizedWeatherDay[]
}

export interface WeatherQueryParams {
  location: string
}
