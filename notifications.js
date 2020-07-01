const pool = require("./mypool").pool

const createNotification = (request, response) => {
    const {userid,message, competitionid} = request.body
      pool.query('INSERT INTO notification (userid,message,competitionid,idndate,ntime) VALUES ($1, $2, $3, CURRENT_DATE, LOCALTIME)', [userid,message, competitionid], (error, results) => {
        if (error) {
          throw error
        }
        else{
          response.status(201).send(`Notification added for user: ${userid}`)
        }
      })
}

  const getNotifications = (request, response) => {
    const {userid} = request.headers;
    const statement = 'SELECT * FROM notification WHERE userid = $1'
    pool.query(statement,[userid], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(200).json(results.rows)
      }
    })
}

const deleteNotification = (request, response) => {
    const {id} = request.headers;
    const statement = 'DELETE from notification where id = $1'
    pool.query(statement,[id], (error, results) => {
      if (error) {
        response.status(400).send(error)
      }
      else{
        response.status(201).send(`Notification deleted with id: ${id}`)
      }
    })
}

module.exports = {
    createNotification,
    getNotifications,
    deleteNotification
}