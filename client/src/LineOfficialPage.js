import React from 'react'
import Advertise from './images/LINEOfficial2.gif'
import './css/OfficialLine.css'

export default function LineOfficialPage(props) {
  return (
    <div id="advertise-background">
      <div id="advertise-flame">
        <a href="https://lin.ee/af7ZhNf" id="linebutton-in-advertise">
          <img
            src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
            alt="友だち追加"
            border="0"
            id="linebutton-image"
          />
        </a>
        <img src={Advertise} id="advertise" alt="広告" />
      </div>
    </div>
  )
}
