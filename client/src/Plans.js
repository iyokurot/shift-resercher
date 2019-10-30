import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import SimpleDatePicker from './PlanDatePicker'
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

const Plans = props => {
  const [plans, setPlandata] = useState([])
  const [plansArray, setPlanArray] = useState([])
  const [selectdate, setSelectDate] = useState(new Date())
  const [addplanText, setAddplanText] = useState('')
  const [isOpenModal, setOpenModal] = useState(false)
  const [changePlandate, setChangePlandate] = useState('')
  const [changePlantext, setChangePlantext] = useState('')
  useEffect(() => {
    fetch('userdata')
      //fetch('testuserdata')
      .then(res => res.json())
      .then(data => {
        if (data.administer) {
          //アクセス許可
          loadPlans()
        } else {
          //アクセス不可
          alert('アクセスできません')
          props.history.push('/')
        }
      })
  }, [])
  const loadPlans = () => {
    fetch('plandata')
      //fetch('testplandata')
      .then(res => res.json())
      .then(data => setPlans(data))
  }
  //Planlist作成
  const setPlans = plans => {
    const list = []
    const array = []
    for (let plan of plans) {
      list[plan.date] = { text: plan.text, date: plan.date }
      array.push(plan.date)
    }
    setPlandata(list)
    setPlanArray(array)
  }
  const onClickAddPlan = () => {
    //空欄判定
    if (addplanText === '') {
      alert('予定を入力してください')
      return
    }
    const adddate = getFormatDate(selectdate)
    const data = {
      text: addplanText,
      date: adddate,
    }
    //存在判定
    if (plans[adddate]) {
      //上書き確認
      if (
        window.confirm(
          'すでに予定が登録されていますが、上書きしますか？\n' +
            '予定：「' +
            plans[adddate].text +
            '」',
        )
      ) {
        //上書き
        fetch('/updateaddplandata', {
          //fetch('/testupdateaddplandata', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        })
          .then(res => res.json())
          .then(str => {
            alert('上書きしました')
            loadPlans()
          })
      }
      return
    }
    //追加処理
    //追加fetch
    fetch('/addplandata', {
      //fetch('/testaddplandata', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(res => res.json())
      .then(str => {
        alert('追加しました')
        loadPlans()
      })
  }
  const onClickDeletePlan = date => {
    if (window.confirm('削除しますか？\n予定：「' + plans[date].text + '」')) {
      //削除
      fetch('/deleteplandata', {
        //fetch('/testdeleteplandata', {
        method: 'POST',
        body: JSON.stringify([date]),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(str => {
          loadPlans()
        })
    }
  }
  //yyyyMMdd
  const getFormatDate = date => {
    return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${(
      '0' + date.getDate()
    ).slice(-2)}`
  }
  const openModal = date => {
    setOpenModal(true)
    setChangePlandate(date)
    setChangePlantext(plans[date].text)
  }
  const closeModal = () => {
    setOpenModal(false)
  }
  const onChangereplaceText = e => {
    setChangePlantext(e.target.value)
  }
  const onClickUpdatePlan = () => {
    if (changePlantext === '') {
      alert('空欄です')
      return
    }
    const data = {
      text: changePlantext,
      date: changePlandate,
    }
    //更新Fetch
    fetch('/updateaddplandata', {
      //fetch('/testupdateaddplandata', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(res => res.json())
      .then(str => {
        loadPlans()
      })
    closeModal()
  }
  return (
    <div>
      <h1>Plans</h1>
      <div className="flame" id="plan-addflame">
        <p id="addplanTitle">予定追加</p>
        <span id="namesubtitle">各日付につき１件のみ</span>
        <div>
          日付
          <SimpleDatePicker onChange={date => setSelectDate(date)} />
        </div>
        <div>
          <input
            placeholder="予定を入力(４文字以内)"
            className="plan-input"
            maxLength="4"
            value={addplanText}
            onChange={e => setAddplanText(e.target.value)}
          />
        </div>
        <button
          className="bluebutton"
          id="plan-addbutton"
          onClick={onClickAddPlan}
        >
          追加
        </button>
      </div>
      <div>
        <span>リスト</span>
        <span>カレンダー</span>
      </div>
      <div className="plantable-holder">
        <table className="plantable">
          <thead>
            <tr className="plantable-head">
              <td className="plantable-td-date">日付</td>
              <td className="plantable-td-text">予定</td>
              <td className="plantable-td-button">削除</td>
              <td className="plantable-td-button">変更</td>
            </tr>
          </thead>
          <tbody className="plantable-tbody">
            {plansArray.map(date => (
              <tr key={date}>
                <td className="plantable-td-date">{date}</td>
                <td className="plantable-td-text">{plans[date].text}</td>
                <td className="plantable-td-button">
                  <button
                    className="redbutton"
                    onClick={() => onClickDeletePlan(date)}
                  >
                    削除
                  </button>
                </td>
                <td className="plantable-td-button">
                  <button
                    className="bluebutton"
                    onClick={() => openModal(date)}
                  >
                    変更
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="worktime Modal"
      >
        <h2 className="modaltitle">変更</h2>
        <div>
          {changePlandate}
          <br />
          <input
            value={changePlantext}
            onChange={onChangereplaceText}
            maxLength="4"
          ></input>
        </div>
        <button className="redbutton" onClick={closeModal}>
          閉じる
        </button>
        <button className="bluebutton" onClick={onClickUpdatePlan}>
          変更
        </button>
      </Modal>
    </div>
  )
}
export default Plans
