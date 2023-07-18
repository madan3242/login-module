require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const userRouter = require('./router/userRouter');
app.use('/api/v1', userRouter)

app.get('/', (req, res) => {
    res.send('<h1>Testing</h1>')
})

module.exports = app