import React, { Component } from 'react'
import NewCalender from './Calender'
import request from 'superagent'
export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      receptionDate: new Date('2019/10/16'),
      plans: [],
      shifts: [],
    }
  }
  componentDidMount() {}
  setlist = plans => {
    const list = []
    for (let plan of plans) {
      list[plan.date] = { text: plan.text }
    }
    this.setState({
      plans: list,
    })
  }
  onClick = () => {
    request
      .get('/auth')
      //.send({ name: name, text: text })
      .end(function(err, res) {
        console.log(res.body)
      })
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
        <div>
          <button className="bluebutton" onClick={this.onClick}>
            auth
          </button>
        </div>
        <div id="top">
          <div id="testcalendar">
            <NewCalender
              receptionDate={this.state.receptionDate}
              plans={this.state.plans}
              shifts={this.state.shifts}
              onChange={value => console.log(value)}
            />
          </div>
        </div>
      </div>
    )
  }
}
