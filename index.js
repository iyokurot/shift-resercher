const express = require('express')
const app = express()
const line_login = require("line-login");
const co = require('co');
const request = require('request');
require("dotenv").config();

const session = require("express-session");
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});


app.set("view engine", "ejs");
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    //res.send('Hello world')
    var data = {
        items: [
            { name: "<h1>リンゴ</h1>" },
            { name: "<h2>バナナ</h2>" },
            { name: "<h3>スイカ</h3>" }
        ],
    };
    // レンダリングを行う
    res.render("./index.ejs", { items: data, lineurl: LineURLMaker() });
})

app.post('/Home', function (req, res) {
    res.send("Home View! ");
})
app.get('/Home', function (req, res) {
    res.send("Home View! Welcome " + req.session.displayName + req.session.results);
})
app.get("/callback", function (req, res) {
    var data = {
        name: "name"
    }
    var name = "testuser";
    req.session.userName = name;
    res.redirect('/send');

});
app.get("/send", function (req, res) {
    res.send(req.session.userName);
});

app.get('/auth', function (req, res, next) {
    const rParams = req.query;

    if (rParams.code) {
        // 認可コード取得のコールバックでここに来る
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
            //res.send(profile.userId);
            //登録済みユーザーか確認
            try {
                const client = await pool.connect()
                const result = await client.query('SELECT FROM user_table where userId=' + profile.userId);
                const results = { 'results': (result) ? result.rows : null };
                //res.render('pages/db', results);
                req.session.userId = profile.userId;
                req.session.displayName = profile.displayName;
                req.session.picture = profile.pictureUrl;
                req.session.results = results;
                res.redirect('/Home');


                client.release();
            } catch (err) {
                console.error(err);
                res.send("Error " + err);
            }


        });
    } else if (rParams.access_token) {
        // アクセストークン取得後のコールバックでここに来る
        res.send(rParams);
    } else {
        // 初回アクセス時はここに来る
        const url = 'https://access.line.me/oauth2/v2.1/authorize';
        const sParams = [
            'response_type=code',
            `client_id=${process.env.LINE_LOGIN_CHANNEL_ID}`,
            `redirect_uri=${process.env.LINE_LOGIN_CALLBACK_URL}`,
            `state=${RandomMaker()}`,
            'scope=profile',
            'nonce=my%20shift-resercher',
        ];

        // 認証画面へリダイレクト(認可コード取得)
        res.redirect(`${url}?${sParams.join('&')}`);

    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log('start')
})

function getToken(params) {
    return new Promise((resolve, reject) => {
        request.post(params, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}

function getProfile(params) {
    return new Promise((resolve, reject) => {
        request.get(params, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });
}
function LineURLMaker() {
    var url = "https://access.line.me/oauth2/v2.1/authorize" + "?response_type=code" + "&client_id=" +
        process.env.LINE_LOGIN_CHANNEL_ID + "&redirect_uri=" + process.env.LINE_LOGIN_CALLBACK_URL + "&state=" +
        RandomMaker() + "&scope=profile";
    return url;
}
function RandomMaker() {
    //LINEログイン用乱数生成
    var state = "";
    // 生成する文字列の長さ
    var l = 10;
    // 生成する文字列に含める文字セット
    var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var cl = c.length;
    for (var i = 0; i < l; i++) {
        state += c[Math.floor(Math.random() * cl)];
    }
    return state;
}