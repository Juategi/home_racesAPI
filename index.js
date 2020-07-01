const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const cluster = require('cluster')

const dbu = require('./users')
const dbc = require('./competitions')
const dbco = require('./comments')
const dbs = require('./search')
const dbn = require('./notifications')
const port = 3000
const cCPUs   = require('os').cpus().length;

if( cluster.isMaster ) {
  // Create a worker for each CPU
  for( var i = 0; i < cCPUs; i++ ) {
    cluster.fork();
  }
  cluster.on( 'online', function( worker ) {
    console.log( 'Worker ' + worker.process.pid + ' is online.' );
  });
  cluster.on( 'exit', function( worker, code, signal ) {
    console.log( 'worker ' + worker.process.pid + ' died.' );
  });
}
else {
  const app = express()
  app.use(compression())
  app.use(helmet())

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

}

