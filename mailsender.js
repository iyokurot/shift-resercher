var receiverEmailAddress = '03yuki18.kp@gmail.com'
var senderEmailAddress = '03yuki18.kp@gmail.com'
var senderEmailPassword = 'kayopile'

var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    type: 'OAuth2',
    user: senderEmailAddress,
    clientId:
      '662087203204-o4s6jqkd5rml89a4jqtb736m47ncg94t.apps.googleusercontent.com',
    clientSecret: 'Fg6HAPWL25mOynnOI1UpHx_K',
    accessToken:
      'ya29.Il-7BzNTwIFf9DR5bxj9yngguRlIv62bhsEjlmBp_nyWxL35_JCt2gG7TskJWRLv1dHHl2u--WDGPV4XCuu2uFNESYn3nGfYIaUzbFEPgPxLro_bSiPSWk3zkD-SZcPq2A',
  },
})
var mailOptions1 = {
  from: senderEmailAddress,
  to: receiverEmailAddress,
  subject: 'mailer test',
  text: 'test message2',
}
transporter.sendMail(mailOptions1, function(error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})
