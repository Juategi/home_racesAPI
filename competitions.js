const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'homeraces',
  password: 'qHeNfB1d5jNOrf8o',
  port: 5432,
})


const getCompetitionsEnrolled = (request, response) => {
    const {id} = request.headers;
    const statement = 'select n1.*, u.username as organizer from users u, (select c.*, count(*) as numcompetitors from competition c, (select c.name, c.id from competition c left join competitors e on c.id = e.competitionid where e.userid = $1 group by c.id) n1 left join competitors e on n1.id = e.competitionid  where n1.id = c.id group by c.id) n1 left join organizer o on n1.id = o.competitionid where o.userid = u.id'
    pool.query(statement,[id], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(200).json(results.rows)
      }
    })
}

const getCompetitionsFavorites = (request, response) => {
  const {id} = request.headers;
  const statement = 'select n1.*, u.username as organizer from users u, (select c.*, count(*) as numcompetitors from competition c, (select c.name, c.id from competition c left join favorites f on c.id = f.competitionid where f.userid = $1 group by c.id) n1 left join competitors e on n1.id = e.competitionid  where n1.id = c.id group by c.id) n1 left join organizer o on n1.id = o.competitionid where o.userid = u.id'
  pool.query(statement,[id], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const deleteFromFavorites = (request, response) => {
  const {userid, competitionid} = request.headers;
  const statement = 'DELETE from favorites where userid = $1 and competitionid = $2'
  pool.query(statement,[userid, competitionid], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(201).send(`Favorite deleted with id: ${competitionid}`)
    }
  })
}

const addToFavorites = (request, response) => {
  const {userid, competitionid} = request.headers;
  const statement = 'INSERT INTO favorites (userid, competitionid) VALUES ($1,$2)'
  pool.query(statement,[userid, competitionid], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(201).send(`Favorite added with id: ${competitionid}`)
    }
  })
}

module.exports = {
    getCompetitionsEnrolled,
    getCompetitionsFavorites,
    deleteFromFavorites,
    addToFavorites
}