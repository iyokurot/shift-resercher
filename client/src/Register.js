import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
}))

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userdata: [],
      username: '',
      worktime: '早',
    }
  }
  componentDidMount() {
    //ユーザーデータ取得
    fetch('/userdata')
      //fetch('/testuserdata')
      .then(res => res.json())
      .then(data => {
        //初期登録アクセスかどうか
        if (data.regist != null && !data.regist) {
          this.setState({ userdata: data, username: data.displayName })
        } else {
          //アクセス拒否
          //this.props.history.push('/')
        }
      })
  }
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <div className="profileholder">
          <div className="profilesetting">
            <div className="profilecard">
              <img
                alt="profile"
                src={this.state.userdata.picture}
                id="profileimage"
              ></img>
              <p id="linename">{this.state.userdata.displayName}</p>
            </div>
            <div>
              ユーザー名：
              <Input
                id="username"
                value={this.state.username}
                onChange={this.onChangeusername}
                className={useStyles.input}
                inputProps={{
                  'aria-label': 'username',
                }}
                placeholder="10文字以内"
              />
              <p id="namesubtitle">サイト内で使用する名前を記入してください</p>
            </div>
            <div className="worktime">
              勤務区分:
              <span>
                <input
                  type="radio"
                  name="worktime"
                  value="早"
                  checked={this.state.worktime === '早'}
                  onChange={() => this.setState({ worktime: '早' })}
                />
                早番
                <input
                  type="radio"
                  name="worktime"
                  value="遅"
                  checked={this.state.worktime === '遅'}
                  onChange={() => this.setState({ worktime: '遅' })}
                />
                遅番
              </span>
            </div>
            <button
              onClick={this.postdata}
              className="bluebutton"
              id="registerbutton"
            >
              登録
            </button>
          </div>
        </div>
      </div>
    )
  }
  onChangeusername = e => {
    this.setState({
      username: e.target.value,
    })
  }

  //登録ボタン
  postdata = () => {
    //名前確認
    if (this.state.username === '') {
      alert('名前を入力してください')
    } else if (this.state.username.length > 10) {
      alert('ユーザー名は10文字以内で入力してください')
    } else {
      const data = {
        username: this.state.username,
        worktime: this.state.worktime,
      }
      fetch('/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => this.props.history.push('/Home'))
    }
  }
}

export default Register
