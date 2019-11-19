const express = require('express')
const { Pool } = require('pg')
//local
const poollocal = new Pool({
  connectionString:
    'postgres://postgres:kayopile@localhost:5432/shift_reserch_test',
})
module.exports = function() {
  const router = express.Router({ mergeParams: true })
  //user
  router.get('/userdata', async (req, res) => {
    try {
      const client = await poollocal.connect()
      const result = await client.query(
        'SELECT * FROM user_table where userId=$1',
        ['sampleId'],
      )
      const results = { results: result ? result.rows : null }
      if (result.rowCount == 0) {
        res.send('no rows')
      } else {
        req.session.userId = results.results[0].userid
        req.session.displayName = 'LINE名前'
        req.session.picture = 'sample.jpg'
        req.session.username = results.results[0].name
        req.session.worktime = results.results[0].worktime
        req.session.administer = results.results[0].administer
        req.session.regist = false
        req.session.access_token = 'test_token'
        var data = {
          userId: req.session.userId,
          displayName: req.session.displayName,
          picture: req.session.picture,
          username: req.session.username,
          worktime: req.session.worktime,
          administer: req.session.administer,
          regist: req.session.regist,
        }
        console.log(req.session)
        res.json(data)
      }
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.get('/memberlist', async (req, res) => {
    try {
      const client = await poollocal.connect()
      const result = await client.query(
        'SELECT * FROM user_table order by userno asc',
      )
      const results = { results: result ? result.rows : null }
      if (result.rowCount == 0) {
        res.send('no rows')
      } else {
        res.json(results.results)
      }
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/updateusername', async (req, res) => {
    try {
      const name = req.body[0]
      const client = await poollocal.connect()
      const result = await client.query(
        'update user_table set name=$1 where userid=$2',
        [name, req.session.userId],
      )

      client.release()
      res.json('name update')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/updateworktime', async (req, res) => {
    try {
      const worktime = req.body[0]
      const client = await poollocal.connect()
      const result = await client.query(
        'update user_table set worktime=$1 where userid=$2',
        [worktime, req.session.userId],
      )

      client.release()
      res.json('name update')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/deleteadminister', async (req, res) => {
    try {
      const id = req.body[0]
      const client = await poollocal.connect()
      const result = await client.query(
        'update user_table set administer=$1 where userid=$2',
        ['f', id],
      )

      client.release()
      res.json('delete administer')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/addadminister', async (req, res) => {
    try {
      const id = req.body[0]
      const client = await poollocal.connect()
      const result = await client.query(
        'update user_table set administer=$1 where userid=$2',
        ['t', id],
      )

      client.release()
      res.json('add administer')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  //shift
  router.get('/shiftdata', async (req, res) => {
    try {
      const client = await poollocal.connect()
      const result = await client.query(
        'SELECT * FROM shift_table where userid=$1',
        [req.session.userId],
      )
      const results = { results: result ? result.rows : null }
      if (result.rowCount == 0) {
        res.send('no rows')
      } else {
        res.json(results.results)
      }
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/addshiftdata', async (req, res) => {
    try {
      const adddata = req.body
      const client = await poollocal.connect()

      for (let data of adddata) {
        const result = await client.query(
          'insert into shift_table (userid,date,detail) values($1,$2,$3)',
          [req.session.userId, data.date, data.text],
        )
      }

      client.release()
      res.json('add')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })

  router.post('/deleteshiftdata', async (req, res) => {
    try {
      const deldata = req.body
      const client = await poollocal.connect()
      for (let data of deldata) {
        const result = await client.query(
          'delete from shift_table where date=$1',
          [data.date],
        )
      }

      client.release()
      res.json('delete')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/updateshiftdata', async (req, res) => {
    try {
      const deldata = req.body
      const client = await poollocal.connect()
      for (let data of deldata) {
        const result = await client.query(
          'update shift_table set detail=$1 where userid=$2 and date=$3',
          [data.text, req.session.userId, data.date],
        )
      }

      client.release()
      res.json('update')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.get('/allshiftdata', async (req, res) => {
    try {
      const client = await poollocal.connect()
      const result = await client.query('SELECT * FROM shift_table')
      const results = { results: result ? result.rows : null }
      if (result.rowCount == 0) {
        res.send('no rows')
      } else {
        res.json(results.results)
      }
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  return router
}
//module.exports = TestRouter
