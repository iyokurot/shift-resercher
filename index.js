const express = require('express')
const app = express()
//const co = require('co');
const request = require('request')
const path = require('path')
require('dotenv').config()

const session = require('express-session')
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
const ALLOWED_ORIGINS = ['http://localhost:3000', 'http://localhost:5000']

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
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
    /*
        co(function* () {
            const auth = {
                code: rParams.code,
                state: rParams.state,
            };
            // アクセストークン取得
            const token = yield getToken({
                uri: 'https://api.line.me/oauth2/v2.1/token',
                form: {
                    grant_type: 'authorization_code',
                    code: auth.code,
                    redirect_uri: process.env.LINE_LOGIN_CALLBACK_URL,
                    client_id: process.env.LINE_LOGIN_CHANNEL_ID,
                    client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
                },
                json: true,
            });
            req.session.access_token = token.access_token;
            //res.send(token.access_token);
            //ユーザー
            const profile = yield getProfile({
                uri: 'https://api.line.me/v2/profile/',
                headers: {
                    Authorization: 'Bearer ' + token.access_token
                },
                json: true,
            });
            //userId,displayName,pictureUrl
            //登録済みユーザーか確認
            req.session.userId = profile.userId;
            req.session.displayName = profile.displayName;
            req.session.picture = profile.pictureUrl;
            res.redirect('/regist');

        });*/
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
    //res.render('pages/db', results);
    if (result.rowCount == 0) {
      //未登録
      //res.send("未登録");
      req.session.regist = false
      res.redirect('/Register')
      //res.render("./register.ejs", { user: req.session });
    } else {
      //登録ユーザー
      req.session.username = results.results[0].name
      req.session.worktime = results.results[0].worktime
      req.session.administer = results.results[0].administer
      res.redirect('/Home')
      //res.render("./home.ejs", { user: req.session });
    }
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})
//ユーザー登録
app.post('/register', async (req, res) => {
  const name = req.body.username
  const userId = req.session.userId
  const worktime = req.body.worktime
  const administer = false
  const sql = 'INSERT INTO user_table values($1,$2,$3,$4)'
  const values = [name, userId, worktime, administer]
  try {
    const client = await pool.connect()
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
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM user_table')
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
app.post('/updateusername', async (req, res) => {
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
})
app.post('/updateworktime', async (req, res) => {
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
})
app.post('/deleteadminister', async (req, res) => {
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
})
app.post('/addadminister', async (req, res) => {
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
})
//shift
app.get('/shiftdata', async (req, res) => {
  try {
    const client = await pool.connect()
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
app.post('/addshiftdata', async (req, res) => {
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
})
app.post('/deleteshiftdata', async (req, res) => {
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
})
app.post('/updateshiftdata', async (req, res) => {
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
})
app.get('/allshiftdata', async (req, res) => {
  try {
    const client = await pool.connect()
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
app.get('/getcommentdata', async (req, res) => {
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
})
app.post('/updatecommentdata', async (req, res) => {
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
})
app.post('/addcommentdata', async (req, res) => {
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
})
app.get('/allcommentdata', async (req, res) => {
  try {
    const client = await pool.connect()
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
//all
app.post('/deletemember', async (req, res) => {
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
})
app.post('/deleteuser', async (req, res) => {
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
})

////テストルート---------------------------------------
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
      req.session.userId = results.results[0].userid
      req.session.displayName = 'LINE名前'
      req.session.picture = 'sample.jpg'
      req.session.username = results.results[0].name
      req.session.worktime = results.results[0].worktime
      req.session.administer = results.results[0].administer
      req.session.regist = false
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
    const result = await client.query('SELECT * FROM user_table')
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
