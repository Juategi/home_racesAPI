const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '88.15.140.153',
  database: 'homeraces',
  password: 'qHeNfB1d5jNOrf8o',
  port: 5432,
})


const getUserById = (request, response) => {
    const {id} = request.headers;
    const statement = 'SELECT * FROM users WHERE id = $1'
    pool.query(statement,[id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


const prueba = (request, response) => {
  const statement = "SELECT * FROM users"
    pool.query(statement, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}


const createUser = (request, response) => {
  const {id, username, firstname, lastname, email, password, device, ip, iplocalization, service, birthdate, locality} = request.body
  pool.query('INSERT INTO users (id, username, firstname, lastname, email, password, device, ip, iplocalization, service, birthdate, locality, registerdate, registertime) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12 CURRENT_DATE, LOCALTIME)', [id, username, firstname, lastname, email, password, device, ip, iplocalization, service, birthdate, locality], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with id: ${id}`)
  })
}

module.exports = {
    getUserById,
    createUser,
    prueba
}