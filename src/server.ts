import { buildApp } from './app'
import { config } from './config/enviroments'
import { connectRedis, disconnectRedis } from './config/redis'

async function start() {
  try {
    // Conectar ao Redis
    await connectRedis()

    // Build e iniciar servidor
    const server = await buildApp()

    await server.listen({
      port: config.port,
      host: config.host,
    })

    console.log(`Server listening on ${config.host}:${config.port}`)

    // Graceful shutdown
    const signals = ['SIGINT', 'SIGTERM']

    signals.forEach((signal) => {
      process.on(signal, async () => {
        console.log(`Received ${signal}, shutting down gracefully...`)

        try {
          await server.close()
          await disconnectRedis()
          process.exit(0)
        } catch (error) {
          console.error('Error during shutdown:', error)
          process.exit(1)
        }
      })
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()
