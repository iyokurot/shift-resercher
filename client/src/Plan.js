import React, { Component, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class Plan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plans: [],
    }
  }
  componentDidMount() {
    fetch('userdata')
      //fetch('testuserdata')
      .then(res => res.json())
      .then(data => {
        if (data.administer) {
          //アクセス許可
        } else {
          //アクセス不可
          alert('アクセスできません')
          this.props.history.push('/')
        }
      })
  }
  render() {
    return (
      <div>
        <h1>Plan</h1>
        <div className="flame">
          <p>予定追加</p>
          <input></input>
          <SimpleDatePicker />
          <input placeholder="予定を入力(４文字以内)" maxLength="4"></input>
          <button className="bluebutton">追加</button>
        </div>
      </div>
    )
  }
}
const SimpleDatePicker = () => {
  const initialDate = new Date()
  const [startDate, setStartDate] = useState(initialDate)
  const handleChange = date => {
    setStartDate(date)
  }

  return (
    <DatePicker
      dateFormat="yyyy/MM/dd"
      selected={startDate}
      onChange={handleChange}
    />
  )
}
