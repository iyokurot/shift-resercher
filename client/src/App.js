import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Home from './Home';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Top} />
      <Route path='/Home' component={Home} />
      <Route path='/Testpage' component={Home} />
    </div>
  </BrowserRouter>
)

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbcheck: [],
      test: [],
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
        <h1>ログイン</h1>
        <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1604188912&redirect_uri=https://shift-resercher.herokuapp.com/auth&state=nkDA8PZ6rx&scope=profile&nonce=my%20shift-resercher">
          LINE ログインテスト2
    </a><br></br>
        <button onClick={this.lineAuth}>ログイン</button>
        <a href="/auth">ログイン２</a>

        <div>
          <h2>tester</h2>
          ------------------<br></br>
          <a href="/callback">
            callback
        </a>
          <br></br>
          <a href="/db" >
            DBChecker
        </a><br></br>
          {this.state.dbcheck.map(data =>
            <div>
              {data.name}
            </div>
          )}
          <button onClick={this.getDBChecker}>
            DBChecker in local
        </button>
          <br></br>
          <a href="/Homelocal">
            HomeChecker in local
        </a>
          <form method="post" action="/Home">
            formtester<br></br>
          </form>
          -------------------------
    </div>
        <button onClick={this.getTest}>tester</button>
        {this.state.test.map(data =>
          <div>
            {data.name}
          </div>)}
        <button onClick={this.setRedirect}>redirect</button>
        <Link to="/Home">Home</Link>
      </div>
    );
  }

  getDBChecker = () => {
    console.log("dbcheck")
    fetch('/dblocal')
      .then(res => res.json())
      .then(data => { this.setState({ dbcheck: data }); })
  }
  lineAuth = () => {
    fetch('/auth', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())

  }
  getTest = () => {
    console.log("test");
    fetch('/testpageredirect')
      .then(res => res.json())
    //.then(data => this.setState({ test: data }))

  }
}

export default App;
