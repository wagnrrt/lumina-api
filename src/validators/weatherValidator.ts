import type { FastifyRequest, FastifyReply } from 'fastify'

export function validateLocation(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  const { location } = request.query as { location?: string }

  if (!location || location.trim() === '') {
    reply.status(400).send({
      error: 'Validation Error',
      message: 'Location parameter is required',
    })
    return
  }

  if (location.length > 200) {
    reply.status(400).send({
      error: 'Validation Error',
      message: 'Location parameter is too long (max 200 characters)',
    })
    return
  }

  done()
}
