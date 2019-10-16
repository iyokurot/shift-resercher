const line = require('@line/bot-sdk')

const config = {
  channelAccessToken: process.env.LINE_MESSAGEING_ACCESS_TOKEN || 'token',
  channelSecret: process.env.LINE_MESSAGEING_SECRET_KEY || 'key',
}

const client = new line.Client(config)
const today = new Date()
let pushtext = ''
if (17 === today.getDate()) {
  pushtext = 'today scheduler'
} else {
  pushtext = 'scheduler test ' + today
}

function messagePost() {
  client
    .broadcast({
      type: 'text',
      text: pushtext,
    })
    .then(data => console.log(data))
    .catch(e => console.log(e))
}

messagePost()
