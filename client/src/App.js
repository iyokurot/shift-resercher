import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import RenewHome from './RenewHome'
import Setting from './Setting'
import Wishlist from './Wishlist'
import Information from './Information'
import Plans from './Plans'
import Test from './Test'
import Callback from './Callback'
import Logs from './Log'
import ShiftAdministar from './ShiftAdministar'
import SortMenber from './SortMenber'
import './css/Tag.css'
import './css/Class.css'
import './css/Id.css'

const App = () => (
  <BrowserRouter>
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Norican&display=swap"
        rel="stylesheet"
      ></link>
      <Route exact path="/" component={Top} />
      <Route path="/Register" component={Register} />
      <Route path="/Home" component={Home} />
      <Route path="/RenewHome" component={RenewHome} />
      <Route path="/Setting" component={Setting} />
      <Route path="/Wishlist" component={Wishlist} />
      <Route path="/Information" component={Information} />
      <Route path="/Plans" component={Plans} />
      <Route path="/TestPage" component={Test} />
      <Route path="/Log" component={Logs} />
      <Route path="/ShiftAdministar" component={ShiftAdministar} />
      <Route path="/SortMenber" component={SortMenber} />
      <Route exact path="/Callback" component={Callback}></Route>
    </div>
  </BrowserRouter>
)

class Top extends Component {
  render() {
    return (
      <div className="App">
        <h1>Shift-Resercher</h1>
        <span>
          シフト希望記入サイト
          <br />
          LINEで登録＆ログイン
          <br />
          ↓　↓　↓
        </span>

        <form action="/auths" method="GET">
          <input type="submit" className="login_button" value="" />
        </form>
        <span id="developer">Developed by itoyu</span>
      </div>
    )
  }
}

export default App
