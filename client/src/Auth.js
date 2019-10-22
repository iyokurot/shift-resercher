import React, { Component } from 'react'

export default class Auth extends Component {
  componentDidMount() {
    fetch('/auth')
      .then(res => res.json())
      .then(data => console.log(data))
  }
  render() {
    return <div></div>
  }
}
