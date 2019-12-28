import React, { useState, useEffect } from 'react'
import { UserContext } from './components/User'
import Calendar from './Calender'
import Modal from 'react-modal'
import LoadingComponent from './reactComponents/loading'
import { GetFormatDate } from './DateHandler'
import { getWishReceptionDate } from './components/ReceptionDate'
import './css/ShiftAdministar.css'
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  formcontrol: {
    fontSize: '10px',
  },
}
Modal.setAppElement('#root')

function ShiftAdministar(props) {
  const { state, dispatch } = React.useContext(UserContext)
  const [receptiondate, setReceptionDate] = useState(new Date()) //表示日付
  const [userlist, setUserlist] = useState([]) //登録ユーザー
  const [printuser, setPrintUser] = useState('') //表示ユーザーName
  const [defshift, setDefshift] = useState([]) //初期シフト
  const [shifts, setShifts] = useState([]) //表示シフト
  const [stamp, setStamp] = useState('x') //スタンプ
  const [loading, setLoading] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false) //モーダル
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('23:45')
  const [selecttimedate, setSelectTimeDate] = useState('') //時間指定用選択日付
  const shifttimes = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
    '23:45',
  ] //選択可能時間

  const testroute = ''
  useEffect(() => {
    setReceptionDate(getWishReceptionDate())
    //user取得
    /*
    fetch(testroute + '/userdata')
      .then(res => res.json())
      .then(data => {
      */
    if (state.user.userId !== '') {
      firstLoading(state.user)
    } else {
      //state無しfetch
      fetch(testroute + '/userdata')
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: 'set-user',
            payload: {
              user: data,
            },
          })
          firstLoading(data)
        })
    }
    //})
  }, [state.user])
  //初期読み込み
  const firstLoading = user => {
    //admin確認
    if (user.administer) {
      //アクセス許可
      //登録ユーザー
      fetch(testroute + '/memberlist')
        .then(res => res.json())
        .then(list => {
          setUserlist(list)
        })
      //シフト
      setPrintUser(user.username)
      getShiftbyId(user.userId)
    } else {
      //アクセス不可
      props.history.push('/')
    }
  }
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
        setLoading(false)
      })
  }
  //表示ユーザー変更
  const onChangePrintUser = name => {
    const id = getUserId(name)
    if (id !== '') {
      setLoading(true)
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
        //shifts[datestr] = { text: 't' }
        setSelectTimeDate(datestr)
        setModalIsOpen(true)
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
  //時間選択記入
  const onSelectTime = () => {
    if (startTime >= endTime) {
      alert('不可能な時間です')
      return
    }
    shifts[selecttimedate] = { text: startTime + '-' + endTime }
    setModalIsOpen(false)
  }
  //登録ボタン
  const onClickRegist = async () => {
    const results = [] //PromiseList
    let confilmtext = '対象ユーザー：' + printuser + '\n'
    //追加シフト
    const newshift = []
    for (const date in shifts) {
      if (null == defshift[date] && '' !== shifts[date].text) {
        newshift.push({ date: date, text: shifts[date].text })
        confilmtext += '追加' + date + ':[' + shifts[date].text + ']\n'
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
        confilmtext += '削除' + date + ':[' + shifts[date].text + ']\n'
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
        confilmtext += '更新' + date + ':[' + shifts[date].text + ']\n'
      }
    }
    if (updateshift.length > 0) {
      results.push(shiftUpdater('/updateshiftdatabyid', updateshift))
    }
    confilmtext += '登録しますか？'
    //登録確認
    if (window.confirm(confilmtext)) {
      await Promise.all(results)
      setDefshift(shifts.slice())
      window.confirm('登録しました')
    }
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
      <div id="explain">
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
            id="userselect"
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
      {loading ? (
        <LoadingComponent />
      ) : (
        <span>
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
        </span>
      )}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={function() {}}
        onRequestClose={e => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="worktime Modal"
      >
        <h2 className="modaltitle">出勤可能時間を選択</h2>
        <div>
          <select
            className="timeselect"
            onChange={e => setStartTime(e.target.value)}
            value={startTime}
          >
            {shifttimes.map(time => (
              <option key={time}>{time}</option>
            ))}
          </select>
          ～
          <select
            className="timeselect"
            onChange={e => setEndTime(e.target.value)}
            value={endTime}
          >
            {shifttimes.map(time => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </div>
        <button className="redbutton" onClick={e => setModalIsOpen(false)}>
          閉じる
        </button>
        <button className="bluebutton" onClick={e => onSelectTime()}>
          決定
        </button>
      </Modal>
    </div>
  )
}
export default ShiftAdministar
