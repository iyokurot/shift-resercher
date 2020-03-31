import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from './components/User'
import Information from './HomeInformation'
import Comment from './RenewHomeComment'
import LoadingComponent from './reactComponents/loading'
import OfficialLine from './reactComponents/OfficialLine'
import Calendar from './Calender'
import Modal from 'react-modal'
import {
  getReceptionDate,
  getNowDeadline,
  receptionText,
} from './components/ReceptionDate'
import { GetFormatDate } from './DateHandler'
import './css/RegistAnimation.css'

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
const customStylesForRegist = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '60%',
  },
}
Modal.setAppElement('#root')
function RenewHome(props) {
  const { state, dispatch } = useContext(UserContext) //userstate
  const testrouter = ''
  const [receptiondate, setReceptionDate] = useState(getReceptionDate())
  const [stamp, setStamp] = useState('x') //スタンプ
  const [nowloading, setNowloading] = useState(true) //読み込み中判定
  const [shifts, setShifts] = useState([]) //シフトリスト
  const [plans, setPlans] = useState([]) //予定リスト
  const [selectTimeDate, setSelectTimeDate] = useState('') //時間指定日付Int
  const [modalIsOpen, setModalIsOpen] = useState(false) //時間指定モーダル
  const [registModalIsOpen, setRegistModalIsOpen] = useState(false) //疑似登録完了モーダル
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('23:45')
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
  useEffect(() => {
    //userdataFetch
    //ユーザーデータ取得
    fetch(testrouter + '/userdata')
      .then(res => res.json())
      .then(data => {
        if (state.user.userId === '' || state.user.userId !== data.userId) {
          dispatch({
            type: 'set-user',
            payload: {
              user: data,
            },
          })
        }
      })
    //シフト取得
    fetch(testrouter + '/shiftdata')
      .then(res => res.json())
      .then(data => {
        const deflist = []
        for (const shift of data) {
          deflist[shift.date] = { text: shift.detail }
        }
        setShifts(deflist)
        setNowloading(false)
      })
    //予定取得
    fetch(testrouter + '/plandata')
      .then(res => res.json())
      .then(plans => {
        const planlist = []
        for (let plan of plans) {
          planlist[plan.date] = { text: plan.text }
        }
        setPlans(planlist)
      })
  }, [])
  const dayclick = value => {
    if (getReceptionDate() <= value) {
      //受付中
      const dateint = GetFormatDate(value)
      //console.log(dateint)
      //空欄か
      if (null == shifts[dateint] || '' === shifts[dateint].text) {
        //Timeか
        if (stamp === 'time') {
          //shifts[datestr] = { text: 't' }
          setSelectTimeDate(dateint)
          setModalIsOpen(true)
        } else {
          //追加
          shifts[dateint] = { text: stamp }
          dbRegister('/addshiftdata', dateint, stamp)
        }
        //同じ
      } else if (stamp === shifts[dateint].text) {
        shifts[dateint] = { text: '' }
        dbRegister('/deleteshiftdata', dateint, stamp)
      } else if (stamp === 'time') {
        shifts[dateint] = { text: '' }
        dbRegister('/deleteshiftdata', dateint, stamp)
      } else {
        shifts[dateint] = { text: stamp }
        dbRegister('/updateshiftdata', dateint, stamp)
      }
      setShifts(shifts)
    } else {
      //受付不可
    }
  }
  const onSelectTime = () => {
    if (startTime >= endTime) {
      alert('不可能な時間です')
      return
    }
    shifts[selectTimeDate] = { text: startTime + '-' + endTime }
    dbRegister('/addshiftdata', selectTimeDate, startTime + '-' + endTime)
    setModalIsOpen(false)
  }
  //更新処理
  const dbRegister = (path, date, text) => {
    fetch(testrouter + path, {
      method: 'POST',
      body: JSON.stringify([{ date: date, text: text }]),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    }).then(res => res.json())
  }
  const openRegistModal = () => {
    setRegistModalIsOpen(true)
    setTimeout(() => {
      setRegistModalIsOpen(false)
    }, 2500)
  }
  return (
    <div>
      <div id="personalheader">
        <span id="setting" onClick={() => props.history.push('/Setting')}>
          <div id="settingimg"></div>
        </span>
        <a href="/logout">
          <span className="redbutton">ログアウト</span>
        </a>
      </div>
      <h1 id="HomeTitle">Home</h1>
      ようこそ！{state.user.username}さん
      <h2 className="reception">
        {getReceptionDate().getFullYear()} {getReceptionDate().getMonth() + 1}月
        {getReceptionDate().getDate()}日～受付中
      </h2>
      <div id="dateText">
        {getNowDeadline()}まで({receptionText(getReceptionDate())})
      </div>
      <Information push={() => props.history.push('/Information')} />
      <OfficialLine />
      <div className="itemholder">
        <button className="redbutton" onClick={() => setStamp('x')}>
          ✕
        </button>
        <button className="greenbutton" onClick={() => setStamp('△')}>
          △
        </button>
        <button className="bluebutton" onClick={() => setStamp('time')}>
          時間指定
        </button>
      </div>
      {nowloading ? (
        <LoadingComponent />
      ) : (
        <div id="shift-holder">
          <div id="newcalendar">
            <Calendar
              receptionDate={receptiondate}
              plans={plans}
              shifts={shifts}
              onChange={value => dayclick(value)}
              setPrintdate={value => setReceptionDate(value)}
            />
          </div>

          <Comment receptionDate={receptiondate} />
          <button className="registButton" onClick={e => openRegistModal()}>
            登録
          </button>
        </div>
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
      <Modal
        isOpen={registModalIsOpen}
        onAfterOpen={function() {}}
        onRequestClose={e => setRegistModalIsOpen(false)}
        style={customStylesForRegist}
        contentLabel="regist_ok_Modal"
      >
        <div className="circle">
          <span className="cover1"></span>
          <span className="cover2"></span>
          <span className="check">✔</span>
        </div>
        <div className="registText">登録完了</div>
      </Modal>
    </div>
  )
}
export default RenewHome
