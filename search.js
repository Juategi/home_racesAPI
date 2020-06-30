const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'homeraces',
  password: 'qHeNfB1d5jNOrf8o',
  port: 5432,
})

const query = (request, response) => {
    const {query, option, locality, limit} = request.headers;
    if(option = "None"){
        const statement = "select n1.*, u.username as organizer from users u, (select c.*, count(*) as numcompetitors from competition c, (select c.name, c.id from competition c left join competitors e on c.id = e.competitionid group by c.id) n1 left join competitors e on n1.id = e.competitionid  where n1.id = c.id group by c.id) n1 left join organizer o on n1.id = o.competitionid where o.userid = u.id and n1.name ILIKE $2 order by n1.name asc limit $1"
        pool.query(statement,[limit,query], (error, results) => {
            if (error) {
            response.status(400).send(error)
            }
            else{
            response.status(200).json(results.rows)
            }
        })
    }
    else if(option = "Promoted"){
        const statement = "select n1.*, u.username as organizer from users u, (select c.*, count(*) as numcompetitors from competition c, (select c.name, c.id from competition c left join competitors e on c.id = e.competitionid group by c.id) n1 left join competitors e on n1.id = e.competitionid  where n1.id = c.id group by c.id) n1 left join organizer o on n1.id = o.competitionid where o.userid = u.id and n1.promoted = 'P' and n1.name ILIKE $2 limit $1"
        pool.query(statement,[limit,query], (error, results) => {
        if (error) {
            response.status(400).send(error)
        }
        else{
            response.status(200).json(results.rows)
        }
        })
    }
    else if(option = "Popular"){
        const statement = "select n1.*, u.username as organizer from users u, (select c.*, count(*) as numcompetitors from competition c, (select c.name, c.id from competition c left join competitors e on c.id = e.competitionid group by c.id) n1 left join competitors e on n1.id = e.competitionid  where n1.id = c.id group by c.id) n1 left join organizer o on n1.id = o.competitionid where o.userid = u.id and n1.name ILIKE $2 order by numcompetitors desc limit $1"
        pool.query(statement,[limit,query], (error, results) => {
            if (error) {
            response.status(400).send(error)
            }
            else{
            response.status(200).json(results.rows)
            }
        })
    }
    
  }

  module.exports = {
      query
  }