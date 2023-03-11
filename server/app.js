const mongoose = require('mongoose')
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })

const {
  requestLogger,
  tokenExtractor,
  // userExtractor,
  unknownEndpoint,
  errorHandler
} = middleware

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', tokenExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app