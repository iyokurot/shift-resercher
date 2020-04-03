const express = require('express')
const { Pool } = require('pg')
const multer = require('multer')
const fs = require('fs')
//local
/*
const pool = new Pool({
  connectionString:
    'postgres://postgres:kayopile@localhost:5432/shift_reserch_test',
})
*/
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
})

module.exports = function() {
  const router = express.Router({ mergeParams: true })

  const url = 'backgroundImages'
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      // 保存したいパス
      cb(null, url)
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + file.originalname)
    },
  })
  const upload = multer({
    storage: storage,
  })

  router.post('/uploadImage', upload.single('imagedata'), async (req, res) => {
    try {
      console.log(req.file)
      console.log(req.protocol + '://' + req.headers.host)
      const path =
        req.protocol +
        '://' +
        req.headers.host +
        '/imagepath/' +
        req.file.filename
      /*
        const name = req.body[0]
        const client = await poollocal.connect()
        const result = await client.query(
          'update user_table set name=$1 where userid=$2',
          [name, req.session.userId],
        )
        */
      const resjson = {
        path: path,
        filename: req.file.filename,
      }
      res.json(resjson)
      const client = await pool.connect()
      const result = await client.query(
        'insert into image_table (path,name) values($1,$2)',
        [path, req.file.filename],
      )
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })

  //新規画像削除
  router.post('/deleteNewImage', async (req, res) => {
    //
    const path = 'backgroundImages/' + req.body.name
    fs.unlink(path, err => {
      if (err) throw err
    })
    res.json('clear')
    try {
      const client = await pool.connect()
      const result = await client.query(
        'delete from image_table where name=$1',
        [req.body.name],
      )
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })

  //元画像削除（defaultへ）
  router.post('/deleteDefaultImage', async (req, res) => {
    //元あり
    const path = 'backgroundImages/' + req.body.name
    fs.unlink(path, err => {
      if (err) throw err
    })
    //DB更新
    try {
      const client = await pool.connect()
      const result = await client.query(
        'update user_table set imagepath=$1 where userid=$2',
        ['', req.session.userId],
      )
      const resultSecond = await client.query(
        'delete from image_table where name=$1',
        [req.body.name],
      )
      res.json('clear')
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })

  //元画像削除（newへ）
  router.post('/deleteDefaultImageToNew', async (req, res) => {
    //元あり
    const path = 'backgroundImages/' + req.body.name
    fs.unlink(path, err => {
      if (err) throw err
    })
    //DB更新
    try {
      const newpath = req.body.newpath
      const client = await pool.connect()
      const result = await client.query(
        'update user_table set imagepath=$1 where userid=$2',
        [newpath, req.session.userId],
      )
      const resultSecond = await client.query(
        'delete from image_table where name=$1',
        [req.body.name],
      )
      res.json('clear')
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })

  //元画像なし（newへ）
  router.post('/setNewImage', async (req, res) => {
    //DB更新
    try {
      const newpath = req.body.newpath
      const client = await pool.connect()
      const result = await client.query(
        'update user_table set imagepath=$1 where userid=$2',
        [newpath, req.session.userId],
      )
      res.json('clear')
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })
  //
  return router
}
