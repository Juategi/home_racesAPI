const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'homeraces',
  password: 'qHeNfB1d5jNOrf8o',
  port: 5432,
})


const createComment = (request, response) => {
    const {userid, competitionid, comment, ip, iplocalization, parentid} = request.body
    
    if(parentid == "null"){
        pool.query('INSERT INTO comment(userid, competitionid, comment, ip, iplocalization, commentdate, commenttime) VALUES ($1,$2,$3,$4,$5, CURRENT_DATE, LOCALTIME) RETURNING id', [userid, competitionid, comment, ip, iplocalization], (error, results) => {
            if (error) {
              throw error
            }
            else{
              response.status(200).json(results.rows)
            }
          })
    }
    else{
        pool.query('INSERT INTO comment(userid, competitionid, comment, ip, iplocalization, parentid, commentdate, commenttime) VALUES ($1,$2,$3,$4,$5,$6, CURRENT_DATE, LOCALTIME) RETURNING id', [userid, competitionid, comment, ip, iplocalization, parentid], (error, results) => {
            if (error) {
              throw error
            }
            else{
              response.status(200).json(results.rows)
            }
          })
    }
      
  }

const getParentComments = (request, response) => {
    const {competitionid} = request.headers;
    const statement = 'SELECT c.*, u.image, cs.numanswers from users u, comment c  left join (select c.id, count(*) as numanswers from comment cs, comment c where cs.parentid = c.id group by c.id) as cs on cs.id = c.id  where c.competitionid = $1 and c.userid = u.id and parentid is null'
    pool.query(statement,[competitionid], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(200).json(results.rows)
      }
    })
}

const getSubComments = (request, response) => {
    const {competitionid, parentid} = request.headers;
    const statement = 'SELECT c.*, u.image from users u, comment c  where c.competitionid = $1 and c.userid = u.id and parentid = $2'
    pool.query(statement,[competitionid,parentid], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(200).json(results.rows)
      }
    })
}

const sendReport = (request, response) => {
    const {userid, commentid, report} = request.body
    
    pool.query('INSERT INTO report(userid, commentid, report) VALUES ($1,$2,$3)', [userid, commentid, report], (error, results) => {
        if (error) {
            throw error
        }
        else{
            response.status(201).send(`Report sent with text: ${report}`)
        }
        })
  }


module.exports = {
    getParentComments,
    getSubComments,
    createComment,
    sendReport
}