import React, { useState, useEffect } from 'react'
import { UserContext } from './components/User'

export default function Contact(porps) {
  const { state, dispatch } = React.useContext(UserContext)
  const [mailMessage, setMailMessage] = useState('')
  const testrouter = '/test'
  useEffect(() => {
    //
    if (state.user.userId !== '') {
      //
    } else {
      //state無しfetch
      fetch(testrouter + '/userdata')
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: 'set-user',
            payload: {
              user: data,
            },
          })
        })
    }
  }, [state.user])
  const sendMail = () => {
    if (0 >= mailMessage.length) {
      return
    }
    console.log(mailMessage)
    fetch('test/sendmail', {
      method: 'POST',
      body: JSON.stringify([mailMessage]),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(res => res.json())
      .then(list => {})
  }
  return (
    <div>
      <h1>Contact Us</h1>
      管理者(開発者)にお問い合わせできます
      <input value={state.user.username}></input>
      <br />
      <textarea
        value={mailMessage}
        onChange={e => setMailMessage(e.target.value)}
      />
      <button onClick={sendMail}>送信</button>
    </div>
  )
}
