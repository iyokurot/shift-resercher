import React from 'react'
import { Link } from 'react-router-dom'
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
        <Link to="/LineOfficialAcount" id="official-link">
          <span>詳細はこちら</span>
        </Link>
      </div>
    </div>
  )
}
