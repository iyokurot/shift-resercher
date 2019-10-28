import React, { Component, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class Plan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plans: [], //予定リスト
      selectdate: new Date(), //新規Plan日付
      addplanText: '', //新規Planテキスト
    }
  }
  componentDidMount() {
    fetch('userdata')
      //fetch('testuserdata')
      .then(res => res.json())
      .then(data => {
        if (data.administer) {
          //アクセス許可
          this.loadPlans()
        } else {
          //アクセス不可
          alert('アクセスできません')
          this.props.history.push('/')
        }
      })
  }
  loadPlans = () => {
    fetch('plandata')
      //fetch('testplandata')
      .then(res => res.json())
      .then(data => this.setPlans(data))
  }
  //Planlist作成
  setPlans = plans => {
    const list = []
    for (let plan of plans) {
      list[plan.date] = { text: plan.text, date: plan.date }
    }
    this.setState({
      plans: list,
    })
  }
  //追加Date
  onChangeSelectDate = date => {
    this.setState({
      selectdate: date,
    })
  }
  //追加Text
  onChangeAddText = e => {
    this.setState({
      addplanText: e.target.value,
    })
  }
  //追加ボタン
  onClickAddPlan = () => {
    //空欄判定
    if (this.state.addplanText === '') {
      alert('予定を入力してください')
      return
    }
    const adddate = this.getFormatDate(this.state.selectdate)
    const data = {
      text: this.state.addplanText,
      date: adddate,
    }
    //存在判定
    if (this.state.plans[adddate]) {
      //上書き確認
      if (
        window.confirm(
          'すでに予定が登録されていますが、上書きしますか？\n' +
            '予定：「' +
            this.state.plans[adddate].text +
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
            this.loadPlans()
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
        this.loadPlans()
      })
  }
  onClickDeletePlan = date => {
    if (
      window.confirm(
        '削除しますか？\n予定：「' + this.state.plans[date].text + '」',
      )
    ) {
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
          this.loadPlans()
        })
    }
  }
  //yyyyMMdd
  getFormatDate(date) {
    return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${(
      '0' + date.getDate()
    ).slice(-2)}`
  }
  render() {
    return (
      <div>
        <h1>Plan</h1>
        <div className="flame" id="plan-addflame">
          <p id="addplanTitle">予定追加</p>
          <span id="namesubtitle">各日付につき１件のみ</span>
          <div>
            日付
            <SimpleDatePicker
              onChange={date => this.onChangeSelectDate(date)}
            />
          </div>
          <div>
            <input
              placeholder="予定を入力(４文字以内)"
              maxLength="4"
              className="plan-input"
              value={this.state.addplanText}
              onChange={this.onChangeAddText}
            />
          </div>
          <button
            className="bluebutton"
            id="plan-addbutton"
            onClick={this.onClickAddPlan}
          >
            追加
          </button>
        </div>
        <div>
          <span>リスト</span>
          <span>カレンダー</span>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <td>日付</td>
                <td>予定</td>
                <td>削除</td>
                <td>変更</td>
              </tr>
            </thead>
            <tbody>
              {this.state.plans.map(plan => (
                <tr key={plan.date}>
                  <td>{plan.date}</td>
                  <td>{plan.text}</td>
                  <td>
                    <button
                      className="redbutton"
                      onClick={() => this.onClickDeletePlan(plan.date)}
                    >
                      削除
                    </button>
                  </td>
                  <td>
                    <button className="bluebutton">変更</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
const SimpleDatePicker = props => {
  const initialDate = new Date()
  const [startDate, setStartDate] = useState(initialDate)
  const handleChange = date => {
    setStartDate(date)
    props.onChange(date)
  }

  return (
    <DatePicker
      dateFormat="yyyy/MM/dd"
      selected={startDate}
      onChange={handleChange}
      customInput={
        <button className="datepicker-button">{dateFormater(startDate)}</button>
      }
    />
  )
}
const dateFormater = date => {
  return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
}
