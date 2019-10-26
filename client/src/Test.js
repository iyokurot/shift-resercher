import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import NewCalender from './Calender'
export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      receptionDate: new Date('2019/10/16'),
      plans: [],
      shifts: [],
    }
  }
  componentDidMount() {
    fetch('/test')
      .then(res => res.json())
      .then(res => console.log(res))
    const list = []
    list[20191016] = { text: 'X' }
    list[20191022] = { text: '17:00-23:00' }
    list[20191027] = { text: '△' }
    list[20191030] = { text: '10:00-22:00' }
    const planlist = [
      { date: new Date('2019/10/17'), text: '早出' },
      { date: new Date('2019/10/21'), text: 'アイナナ' },
      { date: new Date('2019/10/30'), text: '棚卸し' },
    ]
    this.setState({
      shifts: list,
      plans: planlist,
    })
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
        <div>
          <NewCalender
            receptionDate={this.state.receptionDate}
            plans={this.state.plans}
            shifts={this.state.shifts}
          />
        </div>
        <Calendar
          locale="ja-JP"
          calendarType="US"
          value={this.state.receptionDate}
          onChange={value => console.log(value)}
        />
      </div>
    )
  }
}
