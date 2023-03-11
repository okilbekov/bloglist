const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if(auth && auth.startsWith('Bearer ')) {
    request.token = auth.replace('Bearer ', '')
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if(request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
    next()
  }
  else {
    response.status(401).json({ error: 'no token provided' })
  }
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if(error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  } else if(error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}
