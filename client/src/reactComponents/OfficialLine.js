import React from 'react'
import LineImage from '../images/adnyanface2titleVern.jpg'
import '../css/OfficialLine.css'

export default function OfficialLine() {
  return (
    <div id="ofiicial-background">
      <div id="url-background">
        <img src={LineImage} id="icon-image" />
        <div id="textarea">
          <p id="official-title">公式アカウント</p>
          <p id="official-detail">締め切り通知などを行います</p>
        </div>
        <a href="https://lin.ee/af7ZhNf" id="linebutton">
          <img
            src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
            alt="友だち追加"
            height="36"
            border="0"
          />
        </a>
      </div>
    </div>
  )
}
