const express = require('express')
const { Pool } = require('pg')
//local
const poollocal = new Pool({
  connectionString:
    'postgres://postgres:kayopile@localhost:5432/shift_reserch_test',
})
module.exports = function() {
  const router = express.Router({ mergeParams: true })
  router.post('/register', async (req, res) => {
    const name = req.body.username
    const userId = req.session.userId
    const worktime = req.body.worktime
    const administer = false
    const sql = 'INSERT INTO user_table values($1,$2,$3,$4,$5)'
    try {
      const client = await poollocal.connect()
      const countResult = await client.query('select count(*) from user_table')
      const values = [
        name,
        userId,
        worktime,
        administer,
        countResult.rows[0].count,
      ]
      const result = await client.query(sql, values)
      req.session.username = name
      req.session.worktime = worktime
      req.session.administer = administer
      req.session.regist = true
      res.json('regist')
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
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
      res.json('name update')
      writeLog(client, req.session.userId, 'ユーザー名変更', name)
      client.release()
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
      res.json('name update')
      writeLog(client, req.session.userId, '勤務区分変更', worktime)
      client.release()
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
      res.json('delete administer')
      writeLog(client, req.session.userId, '管理者剥奪', id)
      client.release()
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

      res.json('add administer')
      writeLog(client, req.session.userId, '管理者追加', id)
      client.release()
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
        writeLog(
          client,
          req.session.userId,
          'シフト追加',
          data.date + '[' + data.text + ']',
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
        writeLog(client, req.session.userId, 'シフト削除', data.date)
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
        writeLog(
          client,
          req.session.userId,
          'シフト更新',
          data.date + '[' + data.text + ']',
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
  //comment
  router.get('/getcommentdata', async (req, res) => {
    try {
      const client = await poollocal.connect()
      const result = await client.query(
        'SELECT * FROM comment_table where userid=$1',
        [req.session.userId],
      )
      const results = { results: result ? result.rows : null }
      if (result.rowCount == 0) {
        //const create = await client.query('insert into comment_table (userid) values($1)', [req.session.userId]);
        res.json('')
      } else {
        res.json(results.results)
      }
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/updatecommentdata', async (req, res) => {
    try {
      const comment = req.body
      const client = await poollocal.connect()
      for (const com in comment) {
        const result = await client.query(
          'update comment_table set text=$1,wishday=$2  where userid=$3 and date=$4',
          [
            comment[com].comment,
            comment[com].wishday,
            req.session.userId,
            comment[com].date,
          ],
        )
        writeLog(
          client,
          req.session.userId,
          'コメント更新',
          comment[com].date +
            '~日数[' +
            comment[com].wishday +
            ']希望[' +
            comment[com].comment +
            ']',
        )
      }
      client.release()
      res.json('com update')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/addcommentdata', async (req, res) => {
    try {
      const comment = req.body
      const client = await poollocal.connect()
      for (const com in comment) {
        const result = await client.query(
          'insert into comment_table (userid,date,text,wishday) values($1,$2,$3,$4)',
          [
            req.session.userId,
            comment[com].date,
            comment[com].comment,
            comment[com].wishday,
          ],
        )
        writeLog(
          client,
          req.session.userId,
          'コメント追加',
          comment[com].date +
            '~日数[' +
            comment[com].wishday +
            ']希望[' +
            comment[com].comment +
            ']',
        )
      }
      client.release()
      res.json('com add')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.get('/allcommentdata', async (req, res) => {
    try {
      const client = await poollocal.connect()
      const result = await client.query('SELECT * FROM comment_table')
      const results = { results: result ? result.rows : null }
      if (result.rowCount == 0) {
        res.send('no')
      } else {
        res.json(results.results)
      }
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  //information
  router.get('/informationdata', async (req, res) => {
    try {
      const client = await poollocal.connect()
      const result = await client.query(
        'SELECT * FROM information_table order by date desc',
      )
      const results = { results: result ? result.rows : null }
      if (result.rowCount == 0) {
        res.json([])
      } else {
        res.json(results.results)
      }
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.get('/informationdatathree', async (req, res) => {
    try {
      const client = await poollocal.connect()
      const result = await client.query(
        'SELECT * FROM information_table order by date desc limit 3',
      )
      const results = { results: result ? result.rows : null }
      if (result.rowCount == 0) {
        res.json([])
      } else {
        res.json(results.results)
      }
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/addinformationdata', async (req, res) => {
    try {
      const info = req.body
      const client = await poollocal.connect()
      const result = await client.query(
        'insert into information_table (title,message,date) values($1,$2,CURRENT_DATE)',
        [info.title, info.message],
      )

      res.json('com add')
      writeLog(client, req.session.userId, 'おしらせ追加', info.title)
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/deleteinformationdata', async (req, res) => {
    try {
      const id = parseInt(req.body)
      const client = await poollocal.connect()
      const result = await client.query(
        'delete from information_table where id=$1',
        [id],
      )

      res.json('delete')
      writeLog(client, req.session.userId, 'おしらせ削除', id)
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/updateinformationdata', async (req, res) => {
    try {
      const info = req.body
      const client = await poollocal.connect()
      const result = await client.query(
        'update information_table set title=$1,message=$2  where id=$3',
        [info.title, info.message, info.id],
      )

      res.json('com update')
      writeLog(
        client,
        req.session.userId,
        'おしらせ更新',
        info.id + '[' + info.title + ']',
      )
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  //plan
  router.get('/plandata', async (req, res) => {
    try {
      const client = await poollocal.connect()
      const result = await client.query(
        'SELECT * FROM plan_table order by date desc',
      )
      const results = { results: result ? result.rows : null }
      if (result.rowCount == 0) {
        res.json([])
      } else {
        res.json(results.results)
      }
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/addplandata', async (req, res) => {
    try {
      const plan = req.body
      const client = await poollocal.connect()
      const result = await client.query(
        'insert into plan_table (text,date) values($1,$2)',
        [plan.text, plan.date],
      )

      res.json('clear')
      writeLog(
        client,
        req.session.userId,
        '予定追加',
        plan.date + '[' + plan.text + ']',
      )
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/updateaddplandata', async (req, res) => {
    try {
      const plan = req.body
      const client = await poollocal.connect()
      const result = await client.query(
        'update plan_table set text=$1 where date=$2',
        [plan.text, parseInt(plan.date)],
      )

      res.json('clear')
      writeLog(
        client,
        req.session.userId,
        '予定更新',
        plan.date + '[' + plan.text + ']',
      )
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/deleteplandata', async (req, res) => {
    try {
      const date = req.body
      const client = await poollocal.connect()
      const result = await client.query(
        'delete from plan_table where date=$1',
        [parseInt(date)],
      )

      res.json('clear')
      writeLog(client, req.session.userId, '予定削除', parseInt(date))
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  //Logs
  router.get('/getlogdata', async (req, res) => {
    try {
      const client = await poollocal.connect()
      const result = await client.query(
        'SELECT * FROM log_table order by id desc',
      )
      const results = { results: result ? result.rows : null }
      if (result.rowCount == 0) {
        res.json([])
      } else {
        res.json(results.results)
      }
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  //all
  router.post('/deletemember', async (req, res) => {
    try {
      const id = req.body[0]
      const client = await poollocal.connect()
      const result = await client.query(
        'delete from shift_table where userid=$1',
        [id],
      )
      const result1 = await client.query(
        'delete from comment_table where userid=$1',
        [id],
      )
      const result2 = await client.query(
        'delete from user_table where userid=$1',
        [id],
      )

      res.json('delete user')
      writeLog(client, req.session.userId, 'ユーザー削除', id)
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  router.post('/deleteuser', async (req, res) => {
    try {
      const id = req.session.userId
      const client = await poollocal.connect()
      const result = await client.query(
        'delete from shift_table where userid=$1',
        [id],
      )
      const result1 = await client.query(
        'delete from comment_table where userid=$1',
        [id],
      )
      const result2 = await client.query(
        'delete from user_table where userid=$1',
        [id],
      )
      res.json('json')
      writeLog(client, id, 'ユーザー削除', req.session.username)
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  writeLog = async (client, userid, key, detail) => {
    try {
      const result = await client.query(
        'insert into log_table (date,userid,key,detail)values(current_date,$1,$2,$3)',
        [userid, key, detail],
      )
      const results = { results: result ? result.rows : null }
    } catch (err) {
      console.error(err)
    }
  }
  return router
}
