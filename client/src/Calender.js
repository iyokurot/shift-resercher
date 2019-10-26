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
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      years: [2018, 2019, 2020],
      selectMonth: '',
      selectYear: '',
      predays: [], //範囲外前の日たち
      days: [], //範囲内
      backdays: [], //範囲外あとのひたち
      printdays: this.props.receptionDate, //締め切り期間開始日
      selectDay: this.props.receptionDate, //選択している日にち
      shifts: [], //シフトたち
      isSelectMonth: false, //月選択Bool
      plans: this.props.plans,
    }
  }
  componentDidMount() {
    this.setCalendar(this.props.receptionDate)
    this.setState({
      shifts: this.props.shifts,
      selectYear: this.props.receptionDate.getFullYear(),
      selectMonth: this.props.receptionDate.getMonth() + 1,
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
          const prepushdate = new Date(
            beforefinaldate.getFullYear(),
            beforefinaldate.getMonth(),
            beforefinaldate.getDate() - i,
          )
          prelist.push(prepushdate)
        }
      }
      for (let i = 1; i < 16; i++) {
        const pushdate = new Date(date.getFullYear(), date.getMonth(), i)

        list.push({ date: pushdate })
      }
      //あと
      if (6 >= date.getDay()) {
        for (let i = 1; i < 7 - date.getDay(); i++) {
          const backpushdate = new Date(
            date.getFullYear(),
            date.getMonth(),
            15 + i,
          )
          backlist.push(backpushdate)
        }
      }
    } else {
      //後期
      //前
      if (0 < date.getDay()) {
        for (let i = date.getDay() - 1; i >= 0; i--) {
          const prepushdate = new Date(
            date.getFullYear(),
            date.getMonth(),
            15 - i,
          )
          prelist.push(prepushdate)
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
          const backpushdate = new Date(
            finalday.getFullYear(),
            finalday.getMonth() + 1,
            i,
          )
          backlist.push(backpushdate)
        }
      }
    }
    this.setState({
      predays: prelist,
      days: list,
      backdays: backlist,
    })
  }
  onClickselectMonth = () => {
    this.setState({
      isSelectMonth: !this.state.isSelectMonth,
    })
  }
  onChangeSelectYear = e => {
    this.setState({
      selectYear: e.target.value,
    })
  }
  onChangeSelectMonth = e => {
    this.setState({
      selectMonth: e.target.value,
    })
  }
  onClickDecisionMonth = () => {
    const date = new Date(this.state.selectYear, this.state.selectMonth - 1, 1)
    this.setState({
      printdays: date,
      isSelectMonth: false,
    })
    this.setCalendar(date)
  }
  serchPlans = day => {
    const plans = this.state.plans
    for (let plan of plans) {
      const plandate = new Date(plan.date)
      if (
        day.getFullYear() === plandate.getFullYear() &&
        day.getMonth() === plandate.getMonth() &&
        day.getDate() === plandate.getDate()
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
  shiftstyle = str => {
    if (str === 'x' || str === '△') {
      return 'shiftstyle-big'
    } else {
      return 'shiftstyle-default'
    }
  }
  selectDay = day => {
    this.setState({
      selectDay: day,
    })
    this.props.onChange(day)
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
        <div className="calendar-header">
          <button onClick={this.onClickPre} className="calendar-monthButton">
            ＜
          </button>
          <button id="calendar-printmonth" onClick={this.onClickselectMonth}>
            {this.state.printdays.getFullYear()} /{' '}
            {this.state.printdays.getMonth() + 1}
          </button>
          <button onClick={this.onClickBack} className="calendar-monthButton">
            ＞
          </button>
        </div>
        {this.state.isSelectMonth ? (
          <div>
            <p className="select-explain-text">年を選択</p>
            <span className="year-select">
              <select
                value={this.state.selectYear}
                onChange={e => this.onChangeSelectYear(e)}
              >
                {this.state.years.map(year => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </span>
            <p className="select-explain-text">月を選択</p>
            <span className="year-select">
              <select
                value={this.state.selectMonth}
                onChange={e => this.onChangeSelectMonth(e)}
              >
                {this.state.months.map(month => (
                  <option key={month}>{month}</option>
                ))}
              </select>
            </span>
            <br />
            <button
              id="select-printmonth-button"
              onClick={this.onClickDecisionMonth}
            >
              表示
            </button>
          </div>
        ) : (
          <span>
            <div className="calendar-weeks">
              <div className="calendar-week" id="datepanel-sun">
                日
              </div>
              {this.state.weeks.map(week => (
                <div className="calendar-week" key={week}>
                  {week}
                </div>
              ))}
              <div className="calendar-week" id="datepanel-sat">
                土
              </div>
            </div>
            <div className="calendar-days">
              {this.state.predays.map(day => (
                <DatePanel
                  date={day.getDate()}
                  plan={this.serchPlans(day)}
                  shift={this.serchShifts(day)}
                  color="datepanel-unactive"
                  shiftstyle={this.shiftstyle(this.serchShifts(day))}
                  onClick={() => this.selectDay(day)}
                  select={this.isSelect(day)}
                  key={day.getDate()}
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
                  shiftstyle={this.shiftstyle(this.serchShifts(day.date))}
                  key={day.date.getDate()}
                />
              ))}
              {this.state.backdays.map(day => (
                <DatePanel
                  date={day.getDate()}
                  plan={this.serchPlans(day)}
                  shift={this.serchShifts(day)}
                  color="datepanel-unactive"
                  shiftstyle={this.shiftstyle(this.serchShifts(day))}
                  onClick={() => this.selectDay(day)}
                  select={this.isSelect(day)}
                  key={day.getDate()}
                />
              ))}
            </div>
          </span>
        )}
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
      <div className="datepanel-shiftarea" id={props.shiftstyle}>
        {props.shift}
      </div>
    </div>
  )
}
export default Calender
