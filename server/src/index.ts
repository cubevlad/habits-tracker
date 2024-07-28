import express from 'express'
import helmet from 'helmet'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import routes from './routes'
import { expressjwt } from 'express-jwt'
import { authenticateToken } from './utils/authToken'
import cookieParser from 'cookie-parser'

import dotenv from 'dotenv'
import { httpLogger } from './logger'

dotenv.config({
  path: '../.env',
})

console.log(process.env.FRONTEND_APP_URL)

// defining the Express app
const app = express()

// enabling CORS for all requests
app.use(
  cors({
    origin: process.env.FRONTEND_APP_URL,
  })
)

app.options(
  '*',
  cors({
    origin: process.env.FRONTEND_APP_URL,
  })
)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization'
  )
  next()
})

// adding logger
app.use(httpLogger)

// adding Helmet to enhance your Rest API's security
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
app.use(json())
app.use(urlencoded({ extended: true }))

// adding morgan to log HTTP requests
app.use(morgan('combined'))

// defining custom application routes
app.use(routes)

// enabling cookie-parser
app.use(cookieParser())

// middleware for auth
app.use(
  expressjwt({
    secret: process.env.JWT_SECRET || 'SOME_DEFAULT_KEY',
    algorithms: ['HS256'],
  }).unless({
    path: ['/api/v1/user/signup', '/api/v1/user/signin', '/api/v1/user/refresh'],
  })
)

// vierify token in request headers
app.use((req, res, next) => authenticateToken(req, res, next))

// starting the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${process.env.PORT || 3000}`)
})

export default app
