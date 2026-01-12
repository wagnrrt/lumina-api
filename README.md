# Lumina API - Backend

Serviço backend para aplicação Lumina Weather, fornecendo dados meteorológicos otimizados da API Visual Crossing Weather.

## Estrutura do Projeto

```
src/
├── config/
│   ├── environments.ts    # Configuração de ambiente
│   └── redis.ts          # Setup do cliente Redis
├── controllers/
│   └── weatherController.ts  # Controlador de rotas do clima
├── middlewares/
│   └── errorHandler.ts   # Middleware de tratamento de erros
├── routes/
│   ├── index.ts         # Agregador de rotas
│   └── weatherRoutes.ts # Rotas específicas do clima
├── service/
│   ├── cacheService.ts      # Gerenciamento de cache Redis
│   ├── weatherApiService.ts # Comunicação com Visual Crossing API
│   └── weatherService.ts    # Lógica de negócio do clima
├── types/
│   └── weather.types.ts # Tipos TypeScript
├── validators/
│   └── weatherValidator.ts  # Validação de parâmetros
├── app.ts              # Setup da aplicação Fastify
└── server.ts           # Entry point do servidor
```

## Stack Tecnológica

- **Node.js 18+** - Runtime JavaScript
- **Fastify** - Framework web de alta performance
- **TypeScript** - Type safety
- **Redis** - Cache em memória
- **Visual Crossing API** - Fonte de dados meteorológicos

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Editar .env com suas credenciais
WEATHER_API_KEY=sua-chave-visual-crossing
REDIS_HOST=seu-redis-host
```

## Variáveis de Ambiente

```env
# Servidor
PORT=3000
HOST=0.0.0.0

# Redis
REDIS_HOST=seu-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=sua-senha-redis

# API de Clima
WEATHER_API_KEY=sua-chave-api-visual-crossing

# CORS
CORS_ORIGIN=https://seu-dominio-frontend.com
```

## Funcionalidades

- Agregação e normalização de dados meteorológicos
- Sistema de cache Redis com TTL de 1 hora
- Suporte para consultas por cidade, endereço ou coordenadas
- Previsão de 15 dias com detalhamento horário
- Validação de parâmetros e tratamento de erros
- CORS configurável

## Endpoints da API

### Obter Dados Meteorológicos

```http
GET /
Query Parameters:
  - location (string, obrigatório): nome da cidade, endereço ou coordenadas (lat,long)

```

### Exemplo de Resposta

```json
{
  "resolvedAddress": "São Paulo, SP, Brasil",
  "daily": [
    {
      "icon": "partly-cloudy-day",
      "condition": "Parcialmente Nublado",
      "description": "Céu parcialmente coberto ao longo do dia",
      "temp": 24.5,
      "high": 28.0,
      "low": 18.0,
      "feelslikeMax": 29.0,
      "feelslikeMin": 17.0,
      "precipProb": 30,
      "snow": 0,
      "windSpeed": 15.5,
      "windGust": 25.0,
      "humidity": 65,
      "uvIndex": 7,
      "visibility": 10.0,
      "pressure": 1013.2,
      "cloudCover": 45,
      "sunrise": "06:30:00",
      "sunset": "18:45:00",
      "moonPhase": 0.25,
      "severeRisk": 0,
      "hours": [
        {
          "time": "00:00:00",
          "temp": 22.0,
          "feelslike": 21.5,
          "precipProb": 10,
          "icon": "clear-night"
        }
        // ... mais dados horários
      ]
    }
    // ... mais dias (até 15)
  ]
}
```

Para a estrutura completa dos tipos, consulte `src/types/weather.types.ts`.

## Sistema de Cache

A API utiliza Redis para cachear respostas por **1 hora**, reduzindo:
- Custos com a API externa
- Tempo de resposta
- Carga no serviço de origem

As chaves de cache são geradas com base na localização requisitada:
```typescript
cache:weather:{location}
```

## Licença

MIT License - veja o arquivo LICENSE para detalhes

## Projetos Relacionados

- [Lumina Weather Frontend](https://github.com/wagnrrt/lumina-app) - Interface React/TypeScript

## Contato

Para questões e suporte, abra uma issue no repositório.
