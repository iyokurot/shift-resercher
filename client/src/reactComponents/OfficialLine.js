import React from 'react'
import LineImage from '../images/adnyanface2titleVern.jpg'
import '../css/OfficialLine.css'

export default function OfficialLine() {
  return (
    <div id="ofiicial-background">
      <a href="https://lin.ee/af7ZhNf" id="url-background">
        <img src={LineImage} id="icon-image" />
        <div id="textarea">
          <p id="official-title">公式アカウント</p>
          <p id="official-detail">締め切り通知などを行います</p>
        </div>
      </a>
    </div>
  )
}
