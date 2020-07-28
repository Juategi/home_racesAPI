const pool = require("./mypool").pool
require('dotenv').config()

const checkAdmin = (request, response) => {
  const {id} = request.headers;
  const admin = process.env.ADMIN
  if(id == admin){
    response.status(201).send(`True`)
  }
  else{
    response.status(201).send(`False`)
  }
}

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
  const {id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image, country} = request.body
    pool.query('INSERT INTO users (id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image, country, registerdate, registertime) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13, CURRENT_DATE, LOCALTIME)', [id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image, country], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(201).send(`User added with id: ${id}`)
      }
    })
}

const updateUser = (request, response) => {
  const {id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image, sex, birthdate, country, height, weight} = request.body
  if(birthdate != "null"){
    pool.query('update users set username = $2, firstname = $3, lastname = $4, email = $5, password = $6, device = $7, ip = $8, iplocalization = $9, service = $10, locality = $11, image = $12, sex = $13, birthdate = $14, country=$15, height=$16, weight=$17 where id = $1', [id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image, sex, birthdate, country, height, weight], (error, results) => {
      if (error) {
        throw error
      }
      else{
        response.status(201).send(`User updated with id: ${id}`)
      }
    })
  }
  else{
    pool.query('update users set username = $2, firstname = $3, lastname = $4, email = $5, password = $6, device = $7, ip = $8, iplocalization = $9, service = $10, locality = $11, image = $12, sex = $13, country=$14, height=$15, weight=$16 where id = $1', [id, username, firstname, lastname, email, password, device, ip, iplocalization, service, locality, image, sex, country, height, weight], (error, results) => {
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
 
const getKm = (request, response) => {
  const {userid} = request.headers;
  const statement = "select sum(distance) as km from racedata where userid = $1 union select sum(r.distance) as km from racedata r left join competition c on c.id=r.competitionid where userid = $1 and c.promoted = 'P'"
  pool.query(statement,[userid], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const addFollower = (request, response) => {
  const {userid,followerid} = request.body
    pool.query('INSERT INTO followers (userid,followerid) VALUES ($1,$2)', [userid,followerid], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(201).send(`Follower added with id: ${followerid}`)
      }
    })
}

const deleteFollower = (request, response) => {
  const {userid,followerid} = request.headers
    pool.query('DELETE FROM followers WHERE userid = $1 and followerid = $2', [userid,followerid], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(201).send(`Follower deleted with id: ${followerid}`)
      }
    })
}

const getFollowing = (request, response) => {
  const {userid} = request.headers;
  const statement = 'SELECT f.followerid, u.username, u.firstname, u.lastname, u.image FROM followers f, users u WHERE f.userid = $1 and u.id = f.followerid'
  pool.query(statement,[userid], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const getFollowers = (request, response) => {
  const {userid} = request.headers;
  const statement = 'SELECT f.userid, u.username, u.firstname, u.lastname, u.image FROM followers f, users u WHERE f.followerid = $1 and u.id = f.userid'
  pool.query(statement,[userid], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}




module.exports = {
    getUserById,
    createUser,
    checkUsername,
    checkMail,
    deleteUser,
    updateUser,
    addFollower,
    deleteFollower,
    getFollowers,
    getFollowing,
    checkAdmin,
    getKm,
}