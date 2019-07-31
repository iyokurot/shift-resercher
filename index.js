const express = require('express')
const app = express()
const line_login = require("line-login");
require("dotenv").config();

const session = require("express-session");
const session_options = {
    secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    resave: false,
    saveUninitialized: false
}
app.use(session(session_options));

const login = new line_login({
    channel_id: process.env.LINE_LOGIN_CHANNEL_ID,
    channel_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    callback_url: process.env.LINE_LOGIN_CALLBACK_URL
});

app.set("view engine", "ejs");

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
    res.send("Home View!");
})
app.get("/callback", login.callback(
    (req, res, next, token_response) => {
        // 認証フロー成功時
        //res.json(token_response);
        res.send("clear");
    }, (req, res, next, error) => {
        // 認証フロー失敗時
        //res.status(400).json(error);
        res.send("false");
    }
));

app.listen(process.env.PORT || 5000, () => {
    console.log('start')
})

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