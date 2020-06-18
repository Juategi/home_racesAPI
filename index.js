const express = require('express')
const bodyParser = require('body-parser')
const dbu = require('./users')
const dbc = require('./competitions')
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
app.delete('/users', dbu.deleteUser)
app.put('/users', dbu.updateUser)

app.get('/email', dbu.checkMail)
app.get('/username', dbu.checkUsername)
app.get('/competitions', dbc.getCompetitionsEnrolled)

app.get('/favorites', dbc.getCompetitionsFavorites)
app.delete('/favorites', dbc.deleteFromFavorites)
app.put('/favorites', dbc.addToFavorites)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

