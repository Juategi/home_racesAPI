const express = require('express')
const bodyParser = require('body-parser')
const dbu = require('./users')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', dbu.getUserById)
app.post('/users', dbu.createUser)

app.get('/prueba', dbu.prueba)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

