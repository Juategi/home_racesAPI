const pool = require("./mypool").pool

const createCompetition = (request, response) => {
  const {name,image,type,modality,locality,price,capacity,timezone,rewards,observations,promoted,gallery,distance,eventdate,eventtime,enddate,endtime,maxdate,maxtime} = request.body
  if(eventdate == "null"){
    pool.query('INSERT INTO competition (name,image,type,modality,locality,price,capacity,timezone,rewards,observations,promoted,gallery,distance) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)RETURNING id', [name,image,type,modality,locality,price,capacity,timezone,rewards,observations,promoted,gallery,distance], (error, results) => {
      if (error) {
        throw error
      }
      else{
        response.status(200).json(results.rows)
      }
    })
  }
  else{
    pool.query('INSERT INTO competition (name,image,type,modality,locality,price,capacity,timezone,rewards,observations,promoted,gallery,distance,eventdate,eventtime,enddate,endtime,maxdate,maxtime) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)RETURNING id', [name,image,type,modality,locality,price,capacity,timezone,rewards,observations,promoted,gallery,distance,eventdate,eventtime,enddate,endtime,maxdate,maxtime], (error, results) => {
      if (error) {
        throw error
      }
      else{
        response.status(200).json(results.rows)
      }
    })
  }

}

const createOrganizer = (request, response) => {
  const {userid,competitionid,ip,iplocalization} = request.body
    pool.query('INSERT INTO organizer (userid,competitionid,ip,iplocalization,createdate,createtime) VALUES ($1,$2,$3,$4,CURRENT_DATE,LOCALTIME)', [userid,competitionid,ip,iplocalization], (error, results) => {
      if (error) {
        throw error
      }
      else{
        response.status(201).send(`Organizer added with id: ${userid}`)
      }
    })
}

const getCompetitionById = (request, response) => {
  const {id} = request.headers;
  const statement = "select n1.*, u.username as organizer from users u, (select c.*, count(*) as numcompetitors from competition c, (select c.name, c.id from competition c left join competitors e on c.id = e.competitionid group by c.id) n1 left join competitors e on n1.id = e.competitionid  where n1.id = c.id group by c.id) n1 left join organizer o on n1.id = o.competitionid where o.userid = u.id and n1.id = $1"
  pool.query(statement,[id], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

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

const getCompetitionsPromoted = (request, response) => {
  const {locality, limit} = request.headers;
  const statement = "select n1.*, u.username as organizer from users u, (select c.*, count(*) as numcompetitors from competition c, (select c.name, c.id from competition c left join competitors e on c.id = e.competitionid group by c.id) n1 left join competitors e on n1.id = e.competitionid  where n1.id = c.id group by c.id) n1 left join organizer o on n1.id = o.competitionid where o.userid = u.id and n1.promoted = 'P' limit $1"
  pool.query(statement,[limit], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(200).json(results.rows)
    }
  })
}

const getCompetitionsPopular = (request, response) => {
  const {locality, limit} = request.headers;
  const statement = "select n1.*, u.username as organizer from users u, (select c.*, count(*) as numcompetitors from competition c, (select c.name, c.id from competition c left join competitors e on c.id = e.competitionid group by c.id) n1 left join competitors e on n1.id = e.competitionid  where n1.id = c.id group by c.id) n1 left join organizer o on n1.id = o.competitionid where o.userid = u.id order by numcompetitors desc limit $1"
  pool.query(statement,[limit], (error, results) => {
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

const enrrollCompetition = (request, response) => {
  const {userid, competitionid, ip, iplocalization} = request.body;
  const statement = 'INSERT INTO competitors (userid, competitionid, ip, iplocalization, shared, indate, intime) VALUES ($1,$2, $3, $4, 0, CURRENT_DATE,LOCALTIME)'
  pool.query(statement,[userid, competitionid, ip, iplocalization], (error, results) => {
    if (error) {
      response.status(400).send(error)
    }
    else{
      response.status(201).send(`Ok`)
    }
  })
}

module.exports = {
    getCompetitionsEnrolled,
    getCompetitionsFavorites,
    deleteFromFavorites,
    addToFavorites,
    createCompetition,
    createOrganizer,
    enrrollCompetition,
    getCompetitionsPromoted,
    getCompetitionsPopular,
    getCompetitionById
}