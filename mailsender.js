//nodemailerテスト用script

var receiverEmailAddress = '03yuki18.kp@gmail.com'
const senderEmailAddress = 'shiftresercher@gmail.com'

var nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    type: 'OAuth2',
    user: senderEmailAddress,
    clientId:
      '467833761077-l0epkhdmmvlq6e1pdgq0g9flupnp7q9v.apps.googleusercontent.com',
    clientSecret: 'pwriA5eQCQEYT7TPwJcJNXVH',
    refreshToken:
      '1//04Z5o55bN7Fp1CgYIARAAGAQSNwF-L9IrbKOq9F3LWlomGo5PdZVqI-InuRszHzNlTYe-hhS0p54eRtVFWXs6fVyuXPDXmawigAM',
  },
})
var mailOptions1 = {
  from: senderEmailAddress,
  to: receiverEmailAddress,
  subject: 'シフト締め切り通知',
  text: 'Hello to myself!',
  html:
    '<h2>本日シフト締切日です！</h2>' +
    '<p>https://shift-resercher.herokuapp.com/</p>' +
    '<button>onclick</button>',
}
transporter.sendMail(mailOptions1, function(error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})
