import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import NewCalender from './Calender'
export default class Test extends Component {
  componentDidMount() {
    fetch('/test')
      .then(res => res.json())
      .then(res => console.log(res))
  }
  constructor(props) {
    super(props)
    this.state = {
      receptionDate: new Date('2019/10/16'),
    }
  }
  render() {
    return (
      <div>
        <h1>Test</h1>
        <div>
          <NewCalender receptionDate={this.state.receptionDate} />
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
