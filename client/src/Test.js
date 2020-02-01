import React, { useState } from 'react'
//import NewCalender from './Calender'
//import request from 'superagent'
import { UserContext } from './components/User'

function TestPage(props) {
  const { state, dispatch } = React.useContext(UserContext)
  const [mailMessage, setMailMessage] = useState('')
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
  const sendMail = () => {
    if (0 >= mailMessage.length) {
      return
    }
    console.log(mailMessage)
    /*
    fetch('test/sendmail', {
      method: 'POST',
      body: JSON.stringify(['message']),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(res => res.json())
      .then(list => {})
      */
  }
  return (
    <div>
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
        お問い合わせ内容
        <br />
        <textarea
          value={mailMessage}
          onChange={e => setMailMessage(e.target.value)}
        ></textarea>
      </div>
      <button onClick={sendMail}>メール送信</button>
    </div>
  )
}
export default TestPage
