import React, { Component } from 'react'
import './css/Calender.css'

class Calender extends Component {
  constructor(props) {
    super(props)
    //props
    //受付開始日:receptionDate
    //シフトリスト:shifts
    //予定リスと:plans
    this.state = {
      weeks: ['月', '火', '水', '木', '金'],
      predays: [],
      days: [],
      backdays: [],
      printdays: this.props.receptionDate,
      selectDay: this.props.receptionDate,
      shifts: [],
    }
  }
  componentDidMount() {
    this.setCalendar(this.props.receptionDate)
    this.setState({
      shifts: this.props.shifts,
    })
  }
  setCalendar = setdate => {
    const prelist = []
    const list = []
    const backlist = []
    const date = setdate
    //前期
    if (1 === date.getDate()) {
      //前
      if (0 < date.getDay()) {
        const beforefinaldate = new Date(date.getFullYear(), date.getMonth(), 0)
        for (let i = date.getDay() - 1; i >= 0; i--) {
          prelist.push(beforefinaldate.getDate() - i)
        }
      }
      for (let i = 1; i < 16; i++) {
        const pushdate = new Date(date.getFullYear(), date.getMonth(), i)

        list.push({ date: pushdate })
      }
      //あと
      if (6 >= date.getDay()) {
        for (let i = 1; i < 7 - date.getDay(); i++) {
          backlist.push(15 + i)
        }
      }
    } else {
      //後期
      //前
      if (0 < date.getDay()) {
        for (let i = date.getDay() - 1; i >= 0; i--) {
          prelist.push(15 - i)
        }
      }
      const finalday = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      for (let i = 16; i < finalday.getDate() + 1; i++) {
        const pushdate = new Date(date.getFullYear(), date.getMonth(), i)
        list.push({
          date: pushdate,
        })
      }
      //あと
      if (6 > finalday.getDay()) {
        for (let i = 1; i < 7 - finalday.getDay(); i++) {
          backlist.push(i)
        }
      }
    }
    this.setState({
      predays: prelist,
      days: list,
      backdays: backlist,
    })
  }
  serchPlans = day => {
    const plans = this.props.plans
    for (let plan of plans) {
      if (
        day.getFullYear() === plan.date.getFullYear() &&
        day.getMonth() === plan.date.getMonth() &&
        day.getDate() === plan.date.getDate()
      ) {
        return plan.text
      }
    }
    return ''
  }
  serchShifts = day => {
    const shifts = this.props.shifts
    for (let shift in shifts) {
      if (this.getintdate(day) === shift) {
        return shifts[shift].text
      }
    }
    return ''
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
    //console.log(date)
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
    //console.log(date)
    this.setCalendar(date)
  }
  daycssReturn = n => {
    switch (n) {
      case 0:
        return 'datepanel-sun'
      case 6:
        return 'datepanel-sat'
      default:
        return 'datepanel-def'
    }
  }
  isSelect = day => {
    if (this.state.selectDay === day) {
      return true
    }
    return false
  }
  selectDay = day => {
    this.setState({
      selectDay: day,
    })
  }
  //yyMMdd日付
  getintdate(day) {
    return (
      day.getFullYear() +
      ('0' + (day.getMonth() + 1)).slice(-2) +
      ('0' + day.getDate()).slice(-2)
    )
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
          <div className="calendar-week" id="datepanel-sun">
            日
          </div>
          {this.state.weeks.map(week => (
            <div className="calendar-week">{week}</div>
          ))}
          <div className="calendar-week" id="datepanel-sat">
            土
          </div>
        </div>
        <div className="calendar-days">
          {this.state.predays.map(day => (
            <DatePanel
              date={day}
              plan="null"
              shift="X"
              color="datepanel-unactive"
            />
          ))}
          {this.state.days.map(day => (
            <DatePanel
              date={day.date.getDate()}
              plan={this.serchPlans(day.date)}
              shift={this.serchShifts(day.date)}
              color={this.daycssReturn(day.date.getDay())}
              onClick={() => this.selectDay(day.date)}
              select={this.isSelect(day.date)}
            />
          ))}
          {this.state.backdays.map(day => (
            <DatePanel
              date={day}
              plan="null"
              shift="X"
              color="datepanel-unactive"
            />
          ))}
        </div>
      </div>
    )
  }
}
const DatePanel = function(props) {
  //props
  //date,plan,shift,color,onClick
  return (
    <div
      className="DatePanel"
      onClick={props.onClick}
      id={props.select ? 'datepanel-select' : 'DatePanel'}
    >
      <span id={props.select ? '' : props.color}>{props.date}</span>
      <div className="datepanel-planarea">{props.plan}</div>
      <div className="datepanel-shiftarea">{props.shift}</div>
    </div>
  )
}
export default Calender
