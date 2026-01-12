import Fastify from 'fastify'
import cors from '@fastify/cors'
import { registerRoutes } from './routes'
import { config } from './config/enviroments'
import { errorHandler } from './middlewares/errorHandler'

export async function buildApp() {

  const server = Fastify({
    logger: true,
  })

  // Registrar CORS
  await server.register(cors, {
    origin: config.cors.origin,
    methods: config.cors.methods,
  })

  // Registrar rotas
  await registerRoutes(server)

  // Error handler global
  server.setErrorHandler(errorHandler)

  // Health check
  server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  return server
}
