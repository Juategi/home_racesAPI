const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const cluster = require('cluster')
const bodyParser = require('body-parser')

const dbu = require('./users')
const dbc = require('./competitions')
const dbco = require('./comments')
const dbs = require('./search')
const dbn = require('./notifications')
const dbr = require('./races')
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
    cluster.fork();
  });
}
else {
  const app = express()
  app.use(compression())
  app.use(helmet())
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

  app.get('/followers', dbu.getFollowers)
  app.get('/following', dbu.getFollowing)
  app.post('/followers', dbu.addFollower)
  app.delete('/followers', dbu.deleteFollower)

  app.get('/email', dbu.checkMail)
  app.get('/username', dbu.checkUsername)
  app.post('/report', dbco.sendReport)
  app.post('/enrroll', dbc.enrrollCompetition)
  app.get('/popular', dbc.getCompetitionsPopular)
  app.get('/promoted', dbc.getCompetitionsPromoted)
  app.get('/search', dbs.query)
  app.get('/numcompetitors', dbc.getCompetitionNumCompetitors)
  app.get('/competitorsimages', dbc.getCompetitionUserImages)
  app.get('/admin', dbu.checkAdmin)
  app.get('/km', dbu.getKm)

  app.get('/competitionsid', dbc.getCompetitionById)
  app.get('/competitions', dbc.getCompetitionsEnrolled)
  app.post('/competitions', dbc.createCompetition)
  app.put('/competitions', dbc.updateCompetition)

  app.get('/organizer', dbc.getCompetitionsByOrganizer)
  app.post('/organizer', dbc.createOrganizer)

  app.get('/favorites', dbc.getCompetitionsFavorites)
  app.delete('/favorites', dbc.deleteFromFavorites)
  app.put('/favorites', dbc.addToFavorites)

  app.get('/comments', dbco.getParentComments)
  app.post('/comments', dbco.createComment)
  app.get('/subcomments', dbco.getSubComments)

  app.get('/notifications', dbn.getNotifications)
  app.delete('/notifications', dbn.deleteNotification)
  app.post('/notifications', dbn.createNotification)

  app.post('/private', dbc.addPrivate)
  app.get('/private', dbc.getPrivate)
  app.delete('/private', dbc.deletePrivate)

  app.get('/partials', dbr.getPartials)
  app.get('/map', dbr.getMap)
  app.get('/races', dbr.getRaceByCompetitionId)
  app.post('/races', dbr.saveRaceData)
  app.get('/raceuser', dbr.getRaceByUserId)


  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }
  app.get('/example',(request, response) => {
    const pool = require("./mypool").pool
    const statement = "SELECT * FROM users WHERE id = 'MuOh2S1rUxM58eLsGgqDKb3Lm0E3'"
    if (process.pid) {
      console.log('This process is your pid ' + process.pid);
    }
    pool.query(statement,[], (error, results) => {
      if (error) {
        throw error
      }
      else{
        response.status(200).json(results.rows)
      }
    })
  }) //loadtest --rps 50 http://37.14.57.15:3000/example

  app.get('/hi',(req, res) => {
    //console.log("Cluster ID",cluster.worker.id);
    if (process.pid) {
      console.log('This process is your pid ' + process.pid);
    }
    doWork(5000);
    res.send("Done");
  })
  
  app.listen(port, () => {
      console.log(`App running on port ${port}.`)
    })
  
}

