import React, { useState, useEffect } from 'react'
import { UserContext } from './components/User'
import './css/Contact.css'

export default function Contact(props) {
  const { state, dispatch } = React.useContext(UserContext)
  const [mailMessage, setMailMessage] = useState('')
  const [isSend, setIsSend] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isNowSending, setIsNowSending] = useState(false)
  const testrouter = ''
  useEffect(() => {
    //
    if (state.user.userId !== '') {
      //
    } else {
      //state無しfetch
      fetch(testrouter + '/userdata')
        .then(res => res.json())
        .then(data => {
          if (data === '') {
            //謎ユーザー弾き
            props.history.push('/')
          }
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
    if (isNowSending || !isSend) {
      return
    }
    setIsNowSending(true)
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
      .then(res => {
        setIsNowSending(false)
        if ('send' === res) {
          setIsSend(false)
          setTimeout(() => {
            setMailMessage('')
            setIsSend(true)
          }, 3000)
        } else if ('error' === res) {
          setIsError(true)
          setIsSend(false)
          setTimeout(() => {
            setIsSend(true)
            setIsError(false)
          }, 3000)
        }
      })
  }
  const subimtId = () => {
    if (isSend) {
      if (isNowSending) {
        return 'submitsending'
      } else {
        return 'submitcontact'
      }
    } else if (isError) {
      return 'submiterror'
    } else {
      return 'submitclear'
    }
  }
  const subimtText = () => {
    if (isSend) {
      if (isNowSending) {
        return ''
      } else {
        return '送信'
      }
    } else if (isError) {
      return 'エラー'
    } else {
      return '✔'
    }
  }
  return (
    <div>
      <h1>Contact Us</h1>
      管理者(開発者)にお問い合わせできます
      <p id="contacttitle">内容</p>
      <textarea
        id="contactmessage"
        value={mailMessage}
        onChange={e => setMailMessage(e.target.value)}
        placeholder="お問い合わせ内容を入力"
      />
      <br />
      <button className="bluebutton" id={subimtId()} onClick={sendMail}>
        {subimtText()}
        {isNowSending ? (
          <span>
            <span id="submitsphere"></span>
          </span>
        ) : (
          ''
        )}
      </button>
    </div>
  )
}
