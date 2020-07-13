const pool = require("./mypool").pool

const getRaceByCompetitionId = (request, response) => {
    const {competitionid} = request.headers;
    const statement = "select id, userid, time, distance, steps from racedata where competitionid = $1"
    pool.query(statement,[competitionid], (error, results) => {
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
    getPartials
}