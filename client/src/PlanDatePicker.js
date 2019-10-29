import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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
export default SimpleDatePicker
