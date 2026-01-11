import type { FastifyError, FastifyRequest, FastifyReply } from 'fastify'

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.error('Global error handler:', {
    error: error.message,
    stack: error.stack,
    url: request.url,
    method: request.method,
  })

  // Erro de validação do Fastify
  if (error.validation) {
    return reply.status(400).send({
      error: 'Validation Error',
      message: error.message,
      details: error.validation,
    })
  }

  // Erro customizado com status code
  if (error.statusCode) {
    return reply.status(error.statusCode).send({
      error: error.name,
      message: error.message,
    })
  }

  // Erro genérico
  return reply.status(500).send({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  })
}
