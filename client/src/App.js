import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Home from './Home';
import Setting from './Setting';
//test import
import Homelocal from './Homelocal';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Top} />
      <Route path='/Home' component={Home} />
      <Route path='./Setting' component={Setting} />

      <Route path='/Testpage' component={Home} />
      <Route path='/Homelocal' component={Homelocal} />
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
          <Link to="/Homelocal">HomeChecker in local</Link>
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
      </div>
    );
  }

  getDBChecker = () => {
    console.log("dbcheck")
    fetch('/dblocal')
      .then(res => res.json())
      .then(data => { this.setState({ dbcheck: data }); })
  }

  getTest = () => {
    console.log("test");
    fetch('/testpageredirect')
      .then(res => res.json())
    //.then(data => this.setState({ test: data }))

  }
}

export default App;
