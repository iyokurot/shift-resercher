const express = require('express')
const app = express()
const line = require('@line/bot-sdk')
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
//LINE Bot
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN || 'token',
  channelSecret: process.env.SECRET_KEY || 'key',
}
const client = new line.Client(config)
const TestRouter = require('./testrouter')

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
//LINEBot用Push（有料プラン）
app.post('/line', function(req, res) {
  res.status(200).end()
  console.log(req.body.events[0].source.groupId)
  const message = {
    type: 'text',
    text: 'Hi',
  }
  client
    .pushMessage('<groupeId>', message)
    .then(() => {
      console.log('OK')
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/userdata', function(req, res) {
  console.log('ログイン中＿ページ移動')
  console.log(req.session.username)
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
app.get('/auths', async (req, res, next) => {
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
})
app.post('/getuser', async (req, res) => {
  try {
    const auth = req.body
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
    res.json(['clear'])
  } catch (err) {
    console.log(err)
  }
})
//ユーザー登録確認
app.get('/regists', async (req, res) => {
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
      console.log(userId)
      req.session.regist = false
      res.json(['new'])
      writeLog(client, userId, '未登録ユーザーログイン', displayName)
    } else {
      //登録ユーザー
      req.session.username = results.results[0].name
      req.session.worktime = results.results[0].worktime
      req.session.administer = results.results[0].administer
      console.log('userログイン')
      console.log(req.session.username)
      writeLog(client, userId, 'ユーザーログイン', req.session.username)
      res.json(['user'])
    }
    client.release()
  } catch (err) {
    res.json(['error' + err])
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
        20, //countResult.rows[0].count,
      ]
      const result = await client.query(sql, values)
      req.session.username = name
      req.session.worktime = worktime
      req.session.administer = administer
      req.session.regist = true
      console.log('new user Regist!')
      res.json('regist')
      writeLog(client, userId, '新規登録', name)
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
      req.session.username = name
      res.json('name update')
      writeLog(client, req.session.userId, 'ユーザー名変更', name)
      client.release()
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
      res.json('name update')
      writeLog(client, req.session.userId, '勤務区分変更', worktime)
      client.release()
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
      res.json('delete administer')
      writeLog(client, req.session.userId, '管理者剥奪', id)
      client.release()
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
      res.json('add administer')
      writeLog(client, req.session.userId, '管理者追加', id)
      client.release()
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
app.post('/shiftdatabyid', async (req, res) => {
  try {
    const id = req.body[0]
    const client = await pool.connect()
    const result = await client.query(
      'select * from shift_table where userid=$1',
      [id],
    )
    const results = { results: result ? result.rows : null }
    if (result.rowCount == 0) {
      res.send([])
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
  if (req.session.access_token != null) {
    try {
      const adddata = req.body
      const client = await pool.connect()
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
      res.json('add')
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  } else {
    res.json('')
  }
})
app.post('/addshiftdatabyid', async (req, res) => {
  try {
    const data = req.body
    const id = data.id
    const shifts = data.shift
    const client = await pool.connect()
    for (let shift of shifts) {
      const result = await client.query(
        'insert into shift_table (userid,date,detail) values($1,$2,$3)',
        [id, shift.date, shift.text],
      )
      writeLog(
        client,
        id,
        '管理者によるシフト追加',
        shift.date + '[' + shift.text + ']',
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
  if (req.session.access_token != null) {
    try {
      const deldata = req.body
      const client = await pool.connect()
      for (let data of deldata) {
        const result = await client.query(
          'delete from shift_table where date=$1 and userid=$2',
          [data.date, req.session.userId],
        )
        writeLog(client, req.session.userId, 'シフト削除', data.date)
      }
      res.json('delete')
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  } else {
    res.json('')
  }
})
app.post('/deleteshiftdatabyid', async (req, res) => {
  try {
    const data = req.body
    const id = data.id
    const shifts = data.shift
    const client = await pool.connect()
    for (let shift of shifts) {
      const result = await client.query(
        'delete from shift_table where date=$1 and userid=$2',
        [shift.date, id],
      )
      writeLog(client, id, '管理者によるシフト削除', shift.date)
    }
    client.release()
    res.json('delete')
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
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
        writeLog(
          client,
          req.session.userId,
          'シフト更新',
          data.date + '[' + data.text + ']',
        )
      }
      res.json('update')
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  } else {
    res.json('')
  }
})
app.post('/updateshiftdatabyid', async (req, res) => {
  try {
    const data = req.body
    const id = data.id
    const shifts = data.shift
    const client = await pool.connect()
    for (let shift of shifts) {
      const result = await client.query(
        'update shift_table set detail=$1 where userid=$2 and date=$3',
        [shift.text, id, shift.date],
      )
      writeLog(
        client,
        id,
        '管理者によるシフト更新',
        shift.date + '[' + shift.text + ']',
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
      res.json('com update')
      client.release()
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
      res.json(['com add'])
      client.release()
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
    res.json('com add')
    writeLog(client, req.session.userId, 'おしらせ追加', info.title)
    client.release()
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
    res.json('delete')
    writeLog(client, req.session.userId, 'おしらせ削除', id)
    client.release()
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
//Plan
app.get('/plandata', async (req, res) => {
  try {
    const client = await pool.connect()
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
app.post('/addplandata', async (req, res) => {
  try {
    const plan = req.body
    const client = await pool.connect()
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
app.post('/updateaddplandata', async (req, res) => {
  try {
    const plan = req.body
    const client = await pool.connect()
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
app.post('/deleteplandata', async (req, res) => {
  try {
    const date = req.body
    const client = await pool.connect()
    const result = await client.query('delete from plan_table where date=$1', [
      parseInt(date),
    ])
    res.json('clear')
    writeLog(client, req.session.userId, '予定削除', parseInt(date))
    client.release()
  } catch (err) {
    console.error(err)
    res.send('Error ' + err)
  }
})
//Logs
app.get('/getlogdata', async (req, res) => {
  try {
    const client = await pool.connect()
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
      res.json('delete user')
      writeLog(client, req.session.userId, 'ユーザー削除', id)
      client.release()
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
      res.json('json')
      writeLog(client, id, 'ユーザー退会', req.session.username)
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  } else {
    res.json('')
  }
})

////テストルート---------------------------------------------------------------------
app.use('/test', TestRouter())

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
function lineBot(req, res) {
  res.status(200).end()
  console.log('pass')
  const events = req.body.events
  console.log(events)
  /*
  const promises = []
  for (let i = 0, l = events.length; i < l; i++) {
    const ev = events[i]
    promises.push(echoman(ev))
  }
  Promise.all(promises).then(console.log('pass'))
  */
}
async function echoman(ev) {
  const pro = await client.getProfile(ev.source.userId)
  /*
  return client.replyMessage(ev.replyToken, {
    type: "text",
    text: `${pro.displayName}さん、今「${ev.message.text}」って言いました？`
  });
  */
  return
}
//LogDB書き込み
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
