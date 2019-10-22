const express = require('express')
const app = express()
//const co = require('co');
const request = require('request')
const path = require('path')
require('dotenv').config()

const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})
//local
const poollocal = new Pool({
  connectionString:
    'postgres://postgres:kayopile@localhost:5432/shift_reserch_test',
})

app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    store: new RedisStore({
      urll: process.env.REDIS_URL,
      client: redis.createClient({
        url: process.env.REDIS_URL,
      }),
    }),
    cookie: {
      maxAge: null,
      secure: false,
    },
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '/client/build')))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.get('/userdata', function(req, res) {
  console.log('ログイン中＿ページ移動')
  console.log(req.session)
  if (req.session.access_token != null) {
    var data = {
      userId: req.session.userId,
      displayName: req.session.displayName,
      picture: req.session.picture,
      username: req.session.username,
      worktime: req.session.worktime,
      administer: req.session.administer,
      regist: req.session.regist,
    }
    res.json(data)
  } else {
    res.json('')
  }
})

app.get('/auth', async (req, res, next) => {
  const rParams = req.query

  if (rParams.code) {
    // 認可コード取得のコールバックでここに来る
    try {
      const auth = {
        code: rParams.code,
        state: rParams.state,
      }
      // アクセストークン取得
      const token = await getToken({
        uri: 'https://api.line.me/oauth2/v2.1/token',
        form: {
          grant_type: 'authorization_code',
          code: auth.code,
          redirect_uri: process.env.LINE_LOGIN_CALLBACK_URL,
          client_id: process.env.LINE_LOGIN_CHANNEL_ID,
          client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
        },
        json: true,
      })
      req.session.access_token = token.access_token
      //res.send(token.access_token);
      //ユーザー
      const profile = await getProfile({
        uri: 'https://api.line.me/v2/profile/',
        headers: {
          Authorization: 'Bearer ' + token.access_token,
        },
        json: true,
      })
      //userId,displayName,pictureUrl
      //登録済みユーザーか確認
      req.session.userId = profile.userId
      req.session.displayName = profile.displayName
      req.session.picture = profile.pictureUrl
      res.redirect('/regist')
    } catch (err) {
      console.log(err)
    }
  } else if (rParams.access_token) {
    // アクセストークン取得後のコールバックでここに来る
    res.send(rParams)
  } else {
    // 初回アクセス時はここに来る
    const url = 'https://access.line.me/oauth2/v2.1/authorize'
    const sParams = [
      'response_type=code',
      `client_id=${process.env.LINE_LOGIN_CHANNEL_ID}`,
      `redirect_uri=${process.env.LINE_LOGIN_CALLBACK_URL}`,
      `state=${RandomMaker()}`,
      'scope=profile',
      'nonce=my%20shift-resercher',
    ]

    // 認証画面へリダイレクト(認可コード取得)
    res.redirect(`${url}?${sParams.join('&')}`)
  }
})
//ユーザー登録確認
app.get('/regist', async (req, res) => {
  const userId = req.session.userId
  const displayName = req.session.displayName
  const picture = req.session.picture
  try {
    const client = await pool.connect()
    const result = await client.query(
      'SELECT * FROM user_table where userId=$1 limit 1',
      [userId],
    )
    const results = { results: result ? result.rows : null }
    if (result.rowCount == 0) {
      //未登録
      console.log('未登録ユーザー')
      console.log('displayName : ' + displayName)
      req.session.regist = false
      res.redirect('/Register')
    } else {
      //登録ユーザー
      req.session.username = results.results[0].name
      req.session.worktime = results.results[0].worktime
      req.session.administer = results.results[0].administer
      console.log('userログイン')
      console.log(req.session)
      //res.redirect('/Home')
      res.render('./client/src/Home')
    }
    client.release()
  } catch (err) {
    res.send('Error ' + err)
  }
})
//ユーザー登録
app.post('/register', async (req, res) => {
  console.log('新規登録')
  if (req.session.access_token != null) {
    const name = req.body.username
    const userId = req.session.userId
    const worktime = req.body.worktime
    const administer = false
    const sql = 'INSERT INTO user_table values($1,$2,$3,$4,$5)'
    console.log(name + ' : ' + userId)
    try {
      const client = await pool.connect()
      //const countResult = await client.query('select count(*) from user_table')
      const values = [
        name,
        userId,
        worktime,
        administer,
        0, //countResult.rows[0].count,
      ]
      const result = await client.query(sql, values)
      req.session.username = name
      req.session.worktime = worktime
      req.session.administer = administer
      req.session.regist = true
      console.log('new user Regist!')
      res.json('regist')
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  } else {
    res.json('')
  }
})
//ログアウト
app.get('/logout', async (req, res, next) => {
  try {
    const logout = await getToken({
      uri: 'https://api.line.me/oauth2/v2.1/revoke',
      form: {
        access_token: req.session.access_token,
        client_id: process.env.LINE_LOGIN_CHANNEL_ID,
        client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
      },
      headers: {
        ContentType: 'application/x-www-form-urlencoded',
      },
      json: true,
    })
    req.session.destroy()
  } catch (err) {
    console.log(err)
  }
  res.redirect('/')
})

//user
app.get('/memberlist', async (req, res) => {
  if (req.session.access_token != null && req.session.administer) {
    try {
      const client = await pool.connect()
      const result = await client.query(
        'SELECT * FROM user_table order by userno asc',
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
  } else {
    res.send([])
  }
})
app.post('/updateusername', async (req, res) => {
  if (req.session.access_token != null) {
    try {
      const name = req.body[0]
      const client = await pool.connect()
      const result = await client.query(
        'update user_table set name=$1 where userid=$2',
        [name, req.session.userId],
      )

      client.release()
      req.session.username = name
      res.json('name update')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  } else {
    res.json('')
  }
})
app.post('/updateworktime', async (req, res) => {
  if (req.session.access_token != null) {
    try {
      const worktime = req.body[0]
      const client = await pool.connect()
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
  } else {
    res.json('')
  }
})
app.post('/deleteadminister', async (req, res) => {
  if (req.session.access_token != null) {
    try {
      const id = req.body[0]
      const client = await pool.connect()
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
  } else {
    res.json('')
  }
})
app.post('/addadminister', async (req, res) => {
  if (req.session.access_token != null && req.session.administer) {
    try {
      const id = req.body[0]
      const client = await pool.connect()
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
  } else {
    res.json('')
  }
})
//shift
app.get('/shiftdata', async (req, res) => {
  if (req.session.access_token != null) {
    try {
      const client = await pool.connect()
      const result = await client.query(
        'SELECT * FROM shift_table where userid=$1',
        [req.session.userId],
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
  } else {
    res.json('')
  }
})
app.post('/addshiftdata', async (req, res) => {
  if (req.session.access_token != null) {
    try {
      const adddata = req.body
      const client = await pool.connect()
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
  } else {
    res.json('')
  }
})
app.post('/deleteshiftdata', async (req, res) => {
  if (req.session.access_token != null) {
    try {
      const deldata = req.body
      const client = await pool.connect()
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
  } else {
    res.json('')
  }
})
app.post('/updateshiftdata', async (req, res) => {
  if (req.session.access_token != null) {
    try {
      const deldata = req.body
      const client = await pool.connect()
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
  } else {
    res.json('')
  }
})
app.get('/allshiftdata', async (req, res) => {
  if (req.session.access_token != null && req.session.administer) {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM shift_table')
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
  } else {
    res.json('')
  }
})
//comment
app.get('/getcommentdata', async (req, res) => {
  if (req.session.access_token != null) {
    try {
      const client = await pool.connect()
      const result = await client.query(
        'SELECT * FROM comment_table where userid=$1',
        [req.session.userId],
      )
      const results = { results: result ? result.rows : null }
      if (result.rowCount == 0) {
        //const create = await client.query('insert into comment_table (userid) values($1)', [req.session.userId]);
        res.json([])
      } else {
        res.json(results.results)
      }
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  } else {
    res.json('')
  }
})
app.post('/updatecommentdata', async (req, res) => {
  if (req.session.access_token != null) {
    try {
      const comment = req.body
      const client = await pool.connect()
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
      }
      client.release()
      res.json('com update')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  } else {
    res.json('')
  }
})
app.post('/addcommentdata', async (req, res) => {
  if (req.session.access_token != null) {
    try {
      const comment = req.body
      const client = await pool.connect()
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
      }
      client.release()
      res.json(['com add'])
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  } else {
    res.json('')
  }
})
app.get('/allcommentdata', async (req, res) => {
  if (req.session.access_token != null && req.session.administer) {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM comment_table')
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
  } else {
    res.json('')
  }
})
//information
app.get('/informationdata', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query(
      'SELECT * FROM information_table order by date desc,id desc',
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
app.get('/informationdatathree', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query(
      'SELECT * FROM information_table order by date desc,id desc limit 3',
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
app.post('/addinformationdata', async (req, res) => {
  try {
    const info = req.body
    const client = await pool.connect()
    const result = await client.query(
      'insert into information_table (title,message,date) values($1,$2,CURRENT_DATE)',
      [info.title, info.message],
    )
    client.release()
    res.json('com add')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})
app.post('/deleteinformationdata', async (req, res) => {
  try {
    const id = parseInt(req.body)
    const client = await pool.connect()
    const result = await client.query(
      'delete from information_table where id=$1',
      [id],
    )
    client.release()
    res.json('delete')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})
app.post('/updateinformationdata', async (req, res) => {
  try {
    const info = req.body
    const client = await pool.connect()
    const result = await client.query(
      'update information_table set title=$1,message=$2  where id=$3',
      [info.title, info.message, info.id],
    )
    client.release()
    res.json('com update')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})
//all
app.post('/deletemember', async (req, res) => {
  if (req.session.access_token != null && req.session.administer) {
    try {
      const id = req.body[0]
      const client = await pool.connect()
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

      client.release()
      res.json('delete user')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  } else {
    res.json('')
  }
})
//退会
app.post('/deleteuser', async (req, res) => {
  if (req.session.access_token != null) {
    try {
      const id = req.session.userId
      const client = await pool.connect()
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

      client.release()
      res.json('json')
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  } else {
    res.json('')
  }
})

////テストルート---------------------------------------
app.post('/testregister', async (req, res) => {
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
//Home local
//user
app.get('/testuserdata', async (req, res) => {
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
      req.session.userId = 'addlister' //results.results[0].userid
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
app.get('/testmemberlist', async (req, res) => {
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
app.post('/testupdateusername', async (req, res) => {
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
app.post('/testupdateworktime', async (req, res) => {
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
app.post('/testdeleteadminister', async (req, res) => {
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
app.post('/testaddadminister', async (req, res) => {
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
app.get('/testshiftdata', async (req, res) => {
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
app.post('/testaddshiftdata', async (req, res) => {
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
app.post('/testdeleteshiftdata', async (req, res) => {
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
app.post('/testupdateshiftdata', async (req, res) => {
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
app.get('/testallshiftdata', async (req, res) => {
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
app.get('/testgetcommentdata', async (req, res) => {
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
app.post('/testupdatecommentdata', async (req, res) => {
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
    }
    client.release()
    res.json('com update')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})
app.post('/testaddcommentdata', async (req, res) => {
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
    }
    client.release()
    res.json('com add')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})
app.get('/testallcommentdata', async (req, res) => {
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
app.get('/testinformationdata', async (req, res) => {
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
app.get('/testinformationdatathree', async (req, res) => {
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
app.post('/testaddinformationdata', async (req, res) => {
  try {
    const info = req.body
    const client = await poollocal.connect()
    const result = await client.query(
      'insert into information_table (title,message,date) values($1,$2,CURRENT_DATE)',
      [info.title, info.message],
    )
    client.release()
    res.json('com add')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})
app.post('/testdeleteinformationdata', async (req, res) => {
  try {
    const id = parseInt(req.body)
    const client = await poollocal.connect()
    const result = await client.query(
      'delete from information_table where id=$1',
      [id],
    )
    client.release()
    res.json('delete')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})
app.post('/testupdateinformationdata', async (req, res) => {
  try {
    const info = req.body
    const client = await poollocal.connect()
    const result = await client.query(
      'update information_table set title=$1,message=$2  where id=$3',
      [info.title, info.message, info.id],
    )
    client.release()
    res.json('com update')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})

//all
app.post('/testdeletemember', async (req, res) => {
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

    client.release()
    res.json('delete user')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})
app.post('/testdeleteuser', async (req, res) => {
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

    client.release()
    res.json('json')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})
///テストルート終了---------------------------------------

//react
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(process.env.PORT || 5000, () => {
  console.log('start')
})

function getToken(params) {
  return new Promise((resolve, reject) => {
    request.post(params, (error, response, body) => {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    })
  })
}

function getProfile(params) {
  return new Promise((resolve, reject) => {
    request.get(params, (error, response, body) => {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    })
  })
}
function RandomMaker() {
  //LINEログイン用乱数生成
  var state = ''
  // 生成する文字列の長さ
  var l = 10
  // 生成する文字列に含める文字セット
  var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var cl = c.length
  for (var i = 0; i < l; i++) {
    state += c[Math.floor(Math.random() * cl)]
  }
  return state
}
