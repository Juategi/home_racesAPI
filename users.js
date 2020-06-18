const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'homeraces',
  password: 'qHeNfB1d5jNOrf8o',
  port: 5432,
})


const getUserById = (request, response) => {
    const {id} = request.headers;
    const statement = 'SELECT * FROM users WHERE id = $1'
    pool.query(statement,[id], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(200).json(results.rows)
      }
    })
}

const checkUsername = (request, response) => {
  const {username} = request.headers;
  const statement = 'SELECT username FROM users WHERE username = $1'
  pool.query(statement,[username], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const checkMail = (request, response) => {
  const {email} = request.headers;
  const statement = 'SELECT email FROM users WHERE email = $1'
  pool.query(statement,[email], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const createUser = (request, response) => {
  const {id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image} = request.body
    pool.query('INSERT INTO users (id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image, registerdate, registertime) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, CURRENT_DATE, LOCALTIME)', [id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(201).send(`User added with id: ${id}`)
      }
    })
}

const updateUser = (request, response) => {
  const {id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image, sex, birthdate} = request.body
  if(birthdate != "null"){
    pool.query('update users set username = $2, firstname = $3, lastname = $4, email = $5, password = $6, device = $7, ip = $8, iplocalization = $9, service = $10, locality = $11, image = $12, sex = $13, birthdate = $14 where id = $1', [id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image, sex, birthdate], (error, results) => {
      if (error) {
        throw error
      }
      else{
        response.status(201).send(`User updated with id: ${id}`)
      }
    })
  }
  else{
    pool.query('update users set username = $2, firstname = $3, lastname = $4, email = $5, password = $6, device = $7, ip = $8, iplocalization = $9, service = $10, locality = $11, image = $12, sex = $13 where id = $1', [id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image, sex], (error, results) => {
      if (error) {
        throw error
      }
      else{
        response.status(201).send(`User updated with id: ${id}`)
      }
    })
  }
}




const deleteUser = (request, response) => {
  const {id} = request.headers
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(201).send(`User deleted with id: ${id}`)
      }
    })
  }
 


module.exports = {
    getUserById,
    createUser,
    checkUsername,
    checkMail,
    deleteUser,
    updateUser
}