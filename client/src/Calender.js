import React, { Component } from 'react'
import './css/Calender.css'

class Calender extends Component {
  constructor(props) {
    super(props)
    //props
    //受付開始日
    //シフトリスト
    //予定リスと
    this.state = {
      weeks: ['日', '月', '火', '水', '木', '金', '土'],
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      printdays: this.props.receptionDate,
    }
  }
  componentDidMount() {
    this.setCalendar(this.props.receptionDate)
  }
  setCalendar = setdate => {
    const list = []
    const date = setdate
    //前期
    if (1 === date.getDate()) {
      //前
      if (0 < date.getDay()) {
        const beforefinaldate = new Date(date.getFullYear(), date.getMonth(), 0)
        for (let i = date.getDay() - 1; i >= 0; i--) {
          list.push(beforefinaldate.getDate() - i)
        }
      }
      for (let i = 1; i < 16; i++) {
        list.push(i)
      }
      //あと
      if (6 >= date.getDay()) {
        for (let i = 1; i < 7 - date.getDay(); i++) {
          list.push(15 + i)
        }
      }
    } else {
      //後期
      //前
      if (0 < date.getDay()) {
        for (let i = date.getDay() - 1; i >= 0; i--) {
          list.push(15 - i)
        }
      }
      const finalday = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      for (let i = 16; i < finalday.getDate(); i++) {
        list.push(i)
      }
      //あと
      if (6 >= finalday.getDay()) {
        for (let i = 1; i < 7 - date.getDay(); i++) {
          list.push(i)
        }
      }
    }
    this.setState({
      days: list,
    })
  }
  onClickPre = () => {
    let date = this.state.printdays
    if (1 === date.getDate()) {
      if (0 === date.getMonth()) {
        date = new Date(date.getFullYear() - 1, 11, 16)
      } else {
        date = new Date(date.getFullYear(), date.getMonth() - 1, 16)
      }
    } else {
      date = new Date(date.getFullYear(), date.getMonth(), 1)
    }
    this.setState({
      printdays: date,
    })
    console.log(date)
    this.setCalendar(date)
  }
  onClickBack = () => {
    let date = this.state.printdays
    if (1 === date.getDate()) {
      date = new Date(date.getFullYear(), date.getMonth(), 16)
    } else {
      if (11 === date.getMonth()) {
        date = new Date(date.getFullYear() + 1, 0, 1)
      } else {
        date = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      }
    }

    this.setState({
      printdays: date,
    })
    console.log(date)
    this.setCalendar(date)
  }
  render() {
    return (
      <div className="calendar">
        Calender
        <div className="calendar-header">
          <button onClick={this.onClickPre}>＜</button>
          {this.state.printdays.getFullYear()}/
          {this.state.printdays.getMonth() + 1}
          <button onClick={this.onClickBack}>＞</button>
        </div>
        <div className="calendar-weeks">
          {this.state.weeks.map(week => (
            <div className="calendar-week">{week}</div>
          ))}
        </div>
        <div className="calendar-days">
          {this.state.days.map(day => (
            <DatePanel date={day} plan="null" shift="X" />
          ))}
        </div>
      </div>
    )
  }
}
const DatePanel = function(props) {
  return (
    <div className="DatePanel" onClick={() => console.log(props.date)}>
      {props.date}
      <div>{props.plan}</div>
      <div>{props.shift}</div>
    </div>
  )
}
export default Calender
