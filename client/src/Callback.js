import React, { useState, useEffect } from 'react'

const CallBack = props => {
  const [code, setCode] = useState('')
  const [state, setState] = useState('')
  useEffect(() => {
    paramGeter(props.location.search)
  }, [])
  const paramGeter = str => {
    //?除外
    const param = str.substr(1)
    const params = param.split('&')
    const data = []
    for (let query of params) {
      const qs = query.split('=')
      switch (qs[0]) {
        case 'code':
          data.code = qs[1]
          setCode(qs[1])
          break
        case 'state':
          data.state = qs[1]
          setState(qs[1])
          break
        default:
          break
      }
    }
    isRegister(data)
  }
  const isRegister = data => {
    if (data.code == null || data.state == null) {
      backTop()
      return
    }
    const postdata = {
      code: data.code,
      state: data.state,
    }
    //確認fetch
    fetch('/getuser', {
      method: 'POST',
      body: JSON.stringify(postdata),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(res => res.json())
      .then(str => {
        if ('clear' === str[0]) {
          //取得完了
          //登録確認
          fetch('/regists')
            .then(res => res.json())
            .then(res => {
              switch (res[0]) {
                case 'new':
                  //新規登録
                  props.history.push('/Register')
                  break
                case 'user':
                  //ログイン
                  props.history.push('/Home')
                  break
                default:
                  backTop()
                  break
              }
            })
        } else {
          backTop()
        }
      })
  }
  const backTop = () => {
    alert('エラーが発生しました')
    props.history.push('/')
  }
  return (
    <div>
      <h1>Loading</h1>
      <div className="loading">
        <span className="loadingtext">Loading...</span>
        <div class="orbit-spinner">
          <div class="orbit"></div>
          <div class="orbit"></div>
          <div class="orbit"></div>
        </div>
      </div>
    </div>
  )
}

export default CallBack
