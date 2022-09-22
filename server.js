const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongodbConnection = require('./config/mongodbConnection')
const app = express()
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

const port = 5001

app.get('/', (req, res) => res.send('hello mern'))
app.listen(port, () => console.log(`example app on port ${port}`))