const express = require('express')
const { Pool } = require('pg')
const multer = require('multer')
const fs = require('fs')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
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
  const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'background',
    allowedFormats: ['jpg', 'png'],
  })
  const parser = multer({ storage: storage })

  router.post('/uploadImage', parser.single('imagedata'), async (req, res) => {
    try {
      //console.log(req.file.originalname)
      //console.log(req.file.secure_url)
      const resjson = {
        path: req.file.secure_url,
        filename: req.file.public_id,
      }
      res.json(resjson)

      const client = await pool.connect()
      const result = await client.query(
        'insert into image_table (path,name) values($1,$2)',
        [req.file.secure_url, req.file.public_id],
      )
      client.release()
    } catch (err) {
      console.error(err)
      res.send('Error ' + err)
    }
  })

  //新規画像削除
  router.post('/deleteNewImage', async (req, res) => {
    //console.log(req.body.name)
    cloudinary.uploader.destroy(req.body.name, { invalidate: true }, function(
      error,
      result,
    ) {
      console.log('image_delete_by_cloudinary')
      console.log(result, error)
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
    const defpath = req.body.path
    try {
      const client = await pool.connect()
      const result = await client.query(
        'select * from image_table where path=$1',
        [defpath],
      )
      const results = { results: result ? result.rows : null }
      //元あり
      cloudinary.uploader.destroy(
        results.results[0].name,
        { invalidate: true },
        function(error, result) {
          console.log('image_delete_by_cloudinary')
          console.log(result, error)
        },
      )
    } catch (err) {
      console.log(err)
    }

    //DB更新
    try {
      const client = await pool.connect()
      const result = await client.query(
        'update user_table set imagepath=$1 where userid=$2',
        ['', req.session.userId],
      )
      const resultSecond = await client.query(
        'delete from image_table where path=$1',
        [req.body.path],
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
    const defpath = req.body.path
    try {
      const client = await pool.connect()
      const result = await client.query(
        'select * from image_table where path=$1',
        [defpath],
      )
      const results = { results: result ? result.rows : null }
      //元あり
      cloudinary.uploader.destroy(
        results.results[0].name,
        { invalidate: true },
        function(error, result) {
          console.log('image_delete_by_cloudinary')
          console.log(result, error)
        },
      )
      //DB
      const newpath = req.body.newpath
      const resultOne = await client.query(
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
      console.log(err)
      res.send('Error ' + err)
    }
  })

  //元画像なし（newへ）
  router.post('/setNewImage', async (req, res) => {
    //DB更新
    try {
      const newpath = req.body.newpath
      console.log(newpath)
      console.log(req.session.userId)
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
