import React, { useState } from 'react'
//import NewCalender from './Calender'
//import request from 'superagent'
import { UserContext } from './components/User'
import './css/Test.css'
import Image from './images/adface.png'
import sImage from './images/wakana.jpg'

function TestPage(props) {
  const { state, dispatch } = React.useContext(UserContext)
  const [mailMessage, setMailMessage] = useState('')
  const [image, setImage] = useState('TestImageOne')
  const isBool = true
  React.useEffect(() => {}, [state.user])
  const resetColor = () =>
    dispatch({
      type: 'reset-user',
    })

  // "chnage-color"をdispatchしてテーマ変更を行うハンドラ関数
  // payloadには変更する値が入る
  const setColor = color => () =>
    dispatch({
      type: 'set-user',
      payload: {
        user: { username: 'name', userId: 'sampleId', picture: 'http://' },
      },
    })

  return (
    <div
      id="background-test"
      style={
        isBool
          ? {
              backgroundImage: `url(http://localhost:5000/imagepath/wakana.jpg)`,
            }
          : {
              backgroundImage: `url(${sImage})`,
            }
      }
    >
      <h1>TestPage</h1>
      <p>現在の情報</p>
      <ul>
        <li>テーマ名: {state.user.username}</li>
        <li>文字色: {state.user.userId}</li>
        <li>背景色: {state.user.picture}</li>
      </ul>
      <button
        onClick={setColor({
          name: 'Dark',
          text: '#ffffff',
          back: '#000000',
        })}
      >
        変更
      </button>
      <button onClick={resetColor}>初期テーマにリセット</button>
      <div>
        画像切り替え
        <button onClick={() => setImage('TestImageOne')}>one</button>
        <button onClick={() => setImage('TestImageTwo')}>two</button>
        <div className={image}></div>
        <div>test</div>
      </div>
      <div></div>
      <img src={Image} />
      <img src={Image} />
      <img src={Image} />
      <img src={Image} />
    </div>
  )
}
export default TestPage
