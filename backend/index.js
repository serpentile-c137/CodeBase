// const { request } = require('express');
const express = require('express')
const app = express();
const bodyParser = require("body-parser");

const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
require('./db/conn')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

// const User = require('./model/userSchema')

// linking router files
app.use(require('./router/auth'))

const PORT = process.env.PORT

// middleware
const middleware = (req, res, next) => {
    console.log("this is middleware")
    next();
}

// app.get('/', (req, res) => {
//     res.send('hello from express server :)')
// })

app.get('/about', middleware, (req, res) => {
    console.log("about page")
    res.send('hello this is about page')
})

app.get('/test', (req, res) => {
    res.send('this is test route')
})

app.get('/login', (req, res) => {
    res.send('this is login route')
})

app.get('/signup', (req, res) => {
    res.send('this is signup route')
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}\npaste: http://localhost:${PORT} on browser`)
})

