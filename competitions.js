const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '88.15.140.153',
  database: 'homeraces',
  password: 'qHeNfB1d5jNOrf8o',
  port: 5432,
})


const getCompetitionsEnrolled = (request, response) => {
    const {id} = request.headers;
    const statement = 'select c.*, count(*) as numcompetitors from competition c, (select c.name, c.id from competition c left join competitors e on c.id = e.competitionid where e.userid = $1 group by c.id) n1 left join competitors e on n1.id = e.competitionid  where n1.id = c.id group by c.id'
    pool.query(statement,[id], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(200).json(results.rows)
      }
    })
}

module.exports = {
    getCompetitionsEnrolled
}