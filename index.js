const express = require('express')
const bodyParser = require('body-parser')
const dbu = require('./users')
const dbc = require('./competitions')
const dbco = require('./comments')
const dbs = require('./search')
const dbn = require('./notifications')
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
app.post('/organizer', dbc.createOrganizer)
app.post('/report', dbco.sendReport)
app.post('/enrroll', dbc.enrrollCompetition)
app.get('/popular', dbc.getCompetitionsPopular)
app.get('/promoted', dbc.getCompetitionsPromoted)
app.get('/search', dbs.query)

app.get('/competitions', dbc.getCompetitionsEnrolled)
app.post('/competitions', dbc.createCompetition)

app.get('/favorites', dbc.getCompetitionsFavorites)
app.delete('/favorites', dbc.deleteFromFavorites)
app.put('/favorites', dbc.addToFavorites)

app.get('/comments', dbco.getParentComments)
app.post('/comments', dbco.createComment)
app.get('/subcomments', dbco.getSubComments)

app.get('/notifications', dbn.getNotifications)
app.delete('/notifications', dbn.deleteNotification)
app.put('/notifications', dbn.createNotification)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

