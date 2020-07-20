const pool = require("./mypool").pool


const saveRaceData = (request, response) => {
  const {userid,competitionid, time, distance, steps, partials} = request.body
    pool.query('INSERT INTO racedata (userid,competitionid, time, distance, steps, partials, racedate) VALUES ($1,$2,$3,$4,$5,$6,CURRENT_DATE)', [userid,competitionid, time, distance, steps, partials], (error, results) => {
      if (error) {
        throw error
      }
      else{
        response.status(201).send(`Race Data added with id: ${competitionid}`)
      }
    })
}

const getRaceByCompetitionId = (request, response) => {
    const {competitionid} = request.headers;
    const statement = "select r.id, r.userid, r.time, r.distance, r.steps, r.racedate, u.image, u.firstname, u.lastname, u.sex, u.birthdate from racedata r left join users u on u.id = r.userid where r.competitionid = $1"
    pool.query(statement,[competitionid], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(200).json(results.rows)
      }
    })
}


const getRaceByUserId = (request, response) => {
  const {competitionid, userid} = request.headers;
  const statement = "select id from racedata where competitionid = $1 and userid = $2"
  pool.query(statement,[competitionid, userid], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const getPartials = (request, response) => {
  const {id} = request.headers;
  const statement = "select partials from racedata where id = $1"
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
    getRaceByCompetitionId,
    getPartials,
    getRaceByUserId,
    saveRaceData
}