const express = require('express')
require('dotenv').config()
const dbconnection = require('./config/dbconnection')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
  }),
)
const port = process.env.PORT || 8888
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
dbconnection()

initRoutes(app)
app.use('/', (req, res) => {
  res.send('SERVER IS ONNN')
})

app.listen(port, () => {
  console.log('Server running on the part ', port)
})
