//毎日15時に起動させる（heroku　scheduler）
//締め切り日（9，２3）にLINEBotが通知を配信

const line = require('@line/bot-sdk')

const config = {
  channelAccessToken: process.env.LINE_MESSAGEING_ACCESS_TOKEN || 'token',
  channelSecret: process.env.LINE_MESSAGEING_SECRET_KEY || 'key',
}

const client = new line.Client(config)
const today = new Date()

if (9 === today.getDate() || 23 === today.getDate()) {
  messagePost(
    '本日シフト締め切り日です！\nhttps://shift-resercher.herokuapp.com/',
  )
}

function messagePost(pushtext) {
  client
    .broadcast({
      type: 'text',
      text: pushtext,
    })
    .then(data => console.log(data))
    .catch(e => console.log(e))
}
