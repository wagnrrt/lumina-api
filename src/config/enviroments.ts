export const config = {
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || '0.0.0.0',
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
  weatherApi: {
    key: process.env.WEATHER_API_KEY || '',
    baseUrl: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
    unitGroup: 'metric',
    language: 'pt',
    // Solicitar apenas dados diários e horários
    include: 'days,hours',
    // Solicitar apenas os elementos necessários
    elements: [
      'datetime',
      'datetimeEpoch',
      'tempmax',
      'tempmin',
      'temp',
      'feelslikemax',
      'feelslikemin',
      'feelslike',
      'conditions',
      'description',
      'icon',
      'precipprob',
      'snow',
      'windspeed',
      'windgust',
      'humidity',
      'uvindex',
      'visibility',
      'pressure',
      'cloudcover',
      'sunrise',
      'sunset',
      'moonphase',
      'severerisk',
    ].join(','),
  },
  cache: {
    ttl: 60 * 60, // 1 hora em segundos
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET'],
  },
}
