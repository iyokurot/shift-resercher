import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import Setting from './Setting'
import Wishlist from './Wishlist'
import './css/Tag.css'
import './css/Class.css'
import './css/Id.css'

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Top} />
      <Route path="/Register" component={Register} />
      <Route path="/Home" component={Home} />
      <Route path="/Setting" component={Setting} />
      <Route path="/Wishlist" component={Wishlist} />
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

        <form action="/auth" method="GET">
          <input type="submit" className="login_button" value="" />
        </form>
        <span id="developer">Developed by itoyu</span>

        <div>
          ------------------<br></br>
          <Link to="/Home">HomeChecker in locals</Link>
          <br></br>
          -------------------------
        </div>
      </div>
    )
  }
}

export default App
