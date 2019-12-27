import React, { Component } from 'react'
import NewCalender from './Calender'
import request from 'superagent'
import { UserContext } from './components/User'
class Test extends Component {
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
            <form action="/auths" method="GET">
              <input type="submit" className="login_button" value="" />
            </form>
            <form action="/Callback" method="GET">
              <input name="code" id="say" value="cooode"></input>
              <input name="state" id="say" value="sttaate"></input>
              <input type="submit" className="login_button" value="" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
function TestPage(props) {
  const { state, dispatch } = React.useContext(UserContext)
  React.useEffect(() => {
    //
    console.log(state)
  }, [state.user])
  const resetColor = () =>
    dispatch({
      type: 'reset-user',
    })

  // "chnage-color"をdispatchしてテーマ変更を行うハンドラ関数
  // payloadには変更する値が入る
  const setColor = color => () =>
    dispatch({
      type: 'set-user',
      payload: {
        user: { username: 'name', userId: 'sampleId', picture: 'http://' },
      },
    })
  return (
    <div>
      <h1>TestPage</h1>
      <p>現在の情報</p>
      <ul>
        <li>テーマ名: {state.user.username}</li>
        <li>文字色: {state.user.userId}</li>
        <li>背景色: {state.user.picture}</li>
      </ul>
      <button
        onClick={setColor({
          name: 'Dark',
          text: '#ffffff',
          back: '#000000',
        })}
      >
        変更
      </button>
      <button onClick={resetColor}>初期テーマにリセット</button>
    </div>
  )
}
export default TestPage
