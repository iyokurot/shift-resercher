import React, { useState, useEffect } from 'react'
import { UserContext } from './components/User'
import Calendar from './Calender'
import { GetFormatDate } from './DateHandler'
import './css/ShiftAdministar.css'

function ShiftAdministar(props) {
  const { state, dispatch } = React.useContext(UserContext)
  const [receptiondate, setReceptionDate] = useState(new Date(2019, 11, 16)) //表示日付
  const [userlist, setUserlist] = useState([]) //登録ユーザー
  const [printuser, setPrintUser] = useState('') //表示ユーザーName
  const [defshift, setDefshift] = useState([]) //初期シフト
  const [shifts, setShifts] = useState([]) //表示シフト
  const [stamp, setStamp] = useState('x')

  const testroute = ''
  useEffect(() => {
    //user取得
    fetch(testroute + '/userdata')
      .then(res => res.json())
      .then(data => {
        //admin確認
        if (data.administer) {
          //アクセス許可
          //登録ユーザー
          fetch(testroute + '/memberlist')
            .then(res => res.json())
            .then(list => {
              setUserlist(list)
            })
          //シフト
          setPrintUser(data.userId)
          getShiftbyId(data.userId)
        } else {
          //アクセス不可
          props.history.push('/')
        }
      })
    //console.log(state.user)
  }, [state.user])
  //shiftゲッター
  const getShiftbyId = id => {
    fetch(testroute + '/shiftdatabyid', {
      method: 'POST',
      body: JSON.stringify([id]),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(res => res.json())
      .then(data => {
        const list = []
        for (const shift of data) {
          list[shift.date] = { text: shift.detail }
        }
        setDefshift(list)
        setShifts(list.slice())
      })
  }
  //表示ユーザー変更
  const onChangePrintUser = name => {
    const id = getUserId(name)
    if (id !== '') {
      setPrintUser(name)
      getShiftbyId(id)
    }
  }
  //ユーザーID検索
  const getUserId = name => {
    for (const user of userlist) {
      if (name === user.name) {
        return user.userid
      }
    }
    return ''
  }
  //日付クリック
  const onClickDate = date => {
    const datestr = GetFormatDate(date)
    //空欄か
    if (null == shifts[datestr] || '' === shifts[datestr].text) {
      //Timeか
      if (stamp === 'time') {
        shifts[datestr] = { text: 't' }
      } else {
        shifts[datestr] = { text: stamp }
      }
      //同じ
    } else if (stamp === shifts[datestr].text) {
      shifts[datestr] = { text: '' }
    } else if (stamp === 'time') {
      shifts[datestr] = { text: '' }
    } else {
      shifts[datestr] = { text: stamp }
    }
    setShifts(shifts)
  }
  //登録ボタン
  const onClickRegist = async () => {
    const results = [] //PromiseList
    //追加シフト
    const newshift = []
    for (const date in shifts) {
      if (null == defshift[date] && '' !== shifts[date].text) {
        newshift.push({ date: date, text: shifts[date].text })
      }
    }
    if (newshift.length > 0) {
      results.push(shiftUpdater('/addshiftdatabyid', newshift))
    }
    //削除シフト
    const delshift = []
    for (const date in shifts) {
      if (null != defshift[date] && '' === shifts[date].text) {
        delshift.push({ date: date, text: shifts[date].text })
      }
    }
    if (delshift.length > 0) {
      results.push(shiftUpdater('/deleteshiftdatabyid', delshift))
    }
    //更新シフト
    const updateshift = []
    for (const date in defshift) {
      if (
        defshift[date].text !== shifts[date].text &&
        shifts[date].text !== ''
      ) {
        updateshift.push({ date: date, text: shifts[date].text })
      }
    }
    if (updateshift.length > 0) {
      results.push(shiftUpdater('/updateshiftdatabyid', updateshift))
    }
    await Promise.all(results)
    setDefshift(shifts.slice())
  }
  //管理者によるシフト更新
  const shiftUpdater = (path, list) => {
    const data = {
      id: getUserId(printuser),
      shift: list,
    }
    fetch(testroute + path, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
  }
  return (
    <div>
      <h1>ShiftAdministar</h1>
      <h2>テスト中　非利用推奨</h2>
      <div>
        登録ユーザーのシフト希望を追加変更できます
        <br />
        各ユーザーごとに登録をお願いします。
      </div>
      <div>
        表示中ユーザー
        <span>
          <select
            onChange={e => onChangePrintUser(e.target.value)}
            value={printuser}
          >
            {userlist.map(user => (
              <option key={user.userid}>{user.name}</option>
            ))}
          </select>
        </span>
      </div>
      <div className="itemholder">
        <button className="redbutton" onClick={e => setStamp('X')}>
          ✕
        </button>
        <button className="greenbutton" onClick={e => setStamp('△')}>
          △
        </button>
        <button className="bluebutton" onClick={e => setStamp('time')}>
          時間指定
        </button>
      </div>
      <Calendar
        receptionDate={receptiondate}
        shifts={shifts}
        plans={[]}
        onChange={value => onClickDate(value)}
        setPrintdate={value => setReceptionDate(value)}
      />
      <button
        className="redbutton"
        id="shiftadministarregist"
        onClick={e => onClickRegist()}
      >
        登録
      </button>
    </div>
  )
}
export default ShiftAdministar
