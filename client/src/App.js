import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Home from './Home';
import Setting from './Setting';
import Wishlist from './Wishlist';
import './css/Top.css';
//test import
import Homelocal from './Homelocal';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Top} />
      <Route path='/Home' component={Home} />
      <Route path='/Setting' component={Setting} />
      <Route path='/Wishlist' component={Wishlist} />

      <Route path='/Testpage' component={Home} />
      <Route path='/Homelocal' component={Homelocal} />
    </div>
  </BrowserRouter>
)

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/Home' />
    }
  }
  render() {
    return (
      <div className="App">
        {this.renderRedirect()}
        <h1>Shift-Resercher</h1>
        <a href="/auth" class="login_button">login_button</a>
        <form action="/auth" method="GET">
          <input type="submit" />
        </form>

        <div>
          ------------------<br></br>
          <a href="/callback">
            callback
        </a>
          <br></br>
          <a href="/db" >
            DBChecker
        </a>
          <br></br>
          <Link to="/Home">HomeChecker in local</Link>
          <br></br>

          <a href="/regist" >
            regist
        </a>
          <br></br>
          -------------------------
    </div>
        <button onClick={this.setRedirect}>redirect</button>
      </div>
    );
  }


  getTest = () => {
    console.log("test");
  }
}

export default App;
