import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './Home';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Top} />
      <Route path='/Home' component={Home} />
    </div>
  </BrowserRouter>
)

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dbcheck: [],
      test: []
    }
  }
  render() {
    return (
      <div className="App">
        <h1>ログイン</h1>
        <a href="/auth">
          LINE ログインテスト2
    </a><br></br>
        <button onClick={this.lineAuth}>ログイン</button>

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
    fetch('/auth', { mode: 'cors' })
      .then(res => res.json())
  }
  getTest = () => {
    console.log("test");
    fetch('/test')
      .then(res => res.json())
      .then(data => this.setState({ test: data }))
  }
}

export default App;
