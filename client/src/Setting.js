import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import shareIcon from './images/share.svg'
import LoadingComponent from './reactComponents/loading'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
}))
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
Modal.setAppElement('#root')

class Setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userdata: [], //ユーザー情報
      username: '',
      worktime: '',
      memberlist: [], //全ユーザー
      administerlist: [], //管理者
      nonadministerlist: [], //管理者外ユーザー
      addministeroption: [], //管理者候補
      ischangeworktime: false,
      test: '',
      memberModalopen: false,
      administerModalopen: false,
      isAddadminister: false,
      isNowloading: true, //読み込み中
    }
  }
  testroute = ''
  componentDidMount() {
    //ユーザーデータ取得
    fetch(this.testroute + '/userdata')
      .then(res => res.json())
      .then(data => {
        this.isNowloading(data)
        this.setState({
          userdata: data,
          username: data.username,
          worktime: data.worktime,
        })
        if (data.administer) {
          //menbarlist
          this.loadmemberlist()
        }
      })
  }
  loadmemberlist = () => {
    fetch(this.testroute + '/memberlist')
      .then(res => res.json())
      .then(list => {
        this.setState({ memberlist: list })
        const adlist = []
        const nonadlist = []
        for (let user of list) {
          if (user.administer) {
            adlist.push(user)
          } else {
            nonadlist.push(user)
          }
        }
        this.setState({
          administerlist: adlist,
          nonadministerlist: nonadlist,
          addministeroption: nonadlist[0],
        })
      })
  }
  render() {
    return (
      <div>
        <h1>Settings</h1>
        {this.state.isNowloading ? (
          <LoadingComponent />
        ) : (
          <div>
            <div className="profileholder">
              <div className="profilesetting">
                <div className="profilecard">
                  <img
                    src={this.state.userdata.picture}
                    id="profileimage"
                    alt="profile"
                  ></img>
                  <p id="linename">{this.state.userdata.displayName}</p>
                </div>
                <div>
                  ユーザー名
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
                  <button
                    onClick={this.updateUsername}
                    className="bluebutton"
                    id="updatebutton"
                  >
                    更新
                  </button>
                </div>
                <div className="worktime">
                  勤務区分:
                  {this.state.ischangeworktime ? (
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
                      <button onClick={this.setworktime} className="bluebutton">
                        更新
                      </button>
                    </span>
                  ) : (
                    <span>
                      {this.state.userdata.worktime}番
                      <button
                        onClick={this.onChangeworktime}
                        className="bluebutton"
                      >
                        変更
                      </button>
                    </span>
                  )}
                </div>
                <button
                  onClick={this.onClickunsubsribe}
                  className="redbutton"
                  id="disbutton"
                >
                  退会
                </button>
              </div>
            </div>
            <div className="manualdiv">
              <a
                href="https://docs.google.com/presentation/d/1d4WBzpo-So3vK8kw5eVjB_fQ_LBcnjHPEuaHL-7Q_1g/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="outlinkButton">
                  使い方
                  <img src={shareIcon} id="shareIcon" alt="使い方アイコン" />
                </span>
                <p id="sharesubtitle">＊外部ページが開きます</p>
              </a>
            </div>
            <div
              style={{ display: this.state.userdata.administer ? '' : 'none' }}
              className="administerview"
            >
              <h2 className="administerheader">管理者権限</h2>
              <Link to="/Wishlist">
                <span className="administerbutton" id="wishlistbutton">
                  希望一覧
                </span>
              </Link>
              <br />
              <button
                onClick={() => this.props.history.push('/ShiftAdministar')}
                className="administerbutton"
                style={{ width: '250px' }}
              >
                シフト変更登録
              </button>
              <br />
              <button
                onClick={this.pushtoInformation}
                className="administerbutton"
                style={{ width: '250px' }}
              >
                お知らせ配信
              </button>
              <br />
              <button
                onClick={this.pushtoPlan}
                className="administerbutton"
                style={{ width: '250px' }}
              >
                予定登録
              </button>
              <br />
              <button
                onClick={this.pushtoLogs}
                className="administerbutton"
                style={{ width: '250px' }}
              >
                ユーザーログ
              </button>
              <br />
              <button
                onClick={this.openmemberModal}
                className="administerbutton"
              >
                登録者一覧
              </button>
              <button
                onClick={e => this.setState({ administerModalopen: true })}
                className="administerbutton"
              >
                管理者一覧
              </button>
            </div>
            <Modal
              isOpen={this.state.memberModalopen}
              onRequestClose={this.closememberModal}
              style={customStyles}
              contentLabel="Register Modal"
            >
              <h2 className="modaltitle">登録者一覧</h2>
              <div className="modalheight">
                {this.state.memberlist.map(member => (
                  <div key={member.userid}>
                    {member.name}
                    <span
                      style={{
                        display:
                          member.userid !== this.state.userdata.userId
                            ? ''
                            : 'none',
                      }}
                    >
                      <button
                        className="redbutton"
                        value={member.userid}
                        onClick={e => this.onClickdeletemember(member)}
                      >
                        登録削除
                      </button>
                    </span>
                  </div>
                ))}
              </div>
              <button className="redbutton" onClick={this.closememberModal}>
                閉じる
              </button>
            </Modal>
            <Modal
              isOpen={this.state.administerModalopen}
              onRequestClose={this.closeadministerModal}
              style={customStyles}
              contentLabel="Administer Modal"
            >
              <h2 className="modaltitle">管理者一覧</h2>
              <div className="modalheight">
                {this.state.administerlist.map(member => (
                  <div key={member.userid}>
                    {member.name}
                    <span
                      style={{
                        display:
                          member.userid !== this.state.userdata.userId
                            ? ''
                            : 'none',
                      }}
                    >
                      <button
                        className="redbutton"
                        onClick={e => this.onClickdeleteadminister(member)}
                      >
                        解除
                      </button>
                    </span>
                  </div>
                ))}
              </div>
              {this.state.isAddadminister &&
              this.state.nonadministerlist.length > 0 ? (
                <span>
                  <select
                    className="timeselect"
                    onChange={this.onChangeaddministeroption}
                    value={this.state.addministeroption.name}
                  >
                    {this.state.nonadministerlist.map(member => (
                      <option>{member.name}</option>
                    ))}
                  </select>
                  <button
                    className="bluebutton"
                    onClick={e => this.onClickaddAdminister()}
                  >
                    追加
                  </button>
                </span>
              ) : (
                <button
                  className="bluebutton"
                  onClick={e => this.onClickadminister()}
                >
                  追加
                </button>
              )}

              <button className="redbutton" onClick={this.closeadministerModal}>
                閉じる
              </button>
            </Modal>
          </div>
        )}
      </div>
    )
  }
  //読み込み中
  isNowloading = data => {
    if ('' === data || '' === data.username) {
      //読み込み中(error)
      alert('読み込みエラーが発生しました')
      this.props.history.push('/')
    } else {
      this.setState({
        isNowloading: false,
      })
    }
  }
  //ユーザー名変更
  onChangeusername = e => {
    this.setState({
      username: e.target.value,
    })
  }
  //ユーザー名変更処理
  updateUsername = () => {
    if (this.state.username !== this.state.userdata.username) {
      if (this.state.username === '') {
        alert('名前を入力してください')
      } else if (this.state.username.length > 10) {
        alert('ユーザー名は10文字以内で入力してください')
      } else {
        //更新fetch
        fetch(this.testroute + '/updateusername', {
          method: 'POST',
          body: JSON.stringify([this.state.username]),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        })
          .then(res => res.json())
          .then(str => {
            alert('登録しました')
            const userdata = this.state.userdata
            userdata.username = this.state.username
            this.setState({
              userdata: userdata,
            })
          })
      }
    }
  }
  //勤務区分変更判定
  onChangeworktime = () => {
    this.setState({
      ischangeworktime: true,
    })
  }
  //勤務区分更新
  setworktime = () => {
    if (this.state.userdata.worktime !== this.state.worktime) {
      //更新fetch
      fetch(this.testroute + '/updateworktime', {
        method: 'POST',
        body: JSON.stringify([this.state.worktime]),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }).then(res => res.json())
      const userdata = this.state.userdata
      userdata.worktime = this.state.worktime
      this.setState({
        userdata: userdata,
      })
    }
    this.setState({
      ischangeworktime: false,
    })
  }
  //退会ボタン
  onClickunsubsribe = () => {
    //退会確認
    if (window.confirm('退会しますか？\n全ユーザーデータが削除されます')) {
      fetch(this.testroute + '/deleteuser', {
        method: 'POST',
        //body: "sub",
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }).then(res => res.json())
      fetch('/logout').then(res => res.json())
      this.pushtoHome()
    }
  }
  //トップ画面へ
  pushtoHome = () => {
    this.props.history.push('/')
  }
  //お知らせ画面へ
  pushtoInformation = () => {
    this.props.history.push('/Information')
  }
  //予定画面へ
  pushtoPlan = () => {
    this.props.history.push('/Plans')
  }
  //ログ画面へ
  pushtoLogs = () => {
    this.props.history.push('/Log')
  }

  openmemberModal = () => {
    this.setState({ memberModalopen: true })
  }
  closememberModal = () => {
    this.setState({ memberModalopen: false })
  }
  //登録者削除
  onClickdeletemember = member => {
    if (
      window.confirm(
        member.name +
          'を本当に削除しますか？\n該当ユーザーのシフト情報も削除されます',
      )
    ) {
      //削除処理
      fetch(this.testroute + '/deletemember', {
        method: 'POST',
        body: JSON.stringify([member.userid]),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          this.closememberModal()
          //メンバー更新
          this.loadmemberlist()
        })
    } else {
    }
  }
  //管理者権限剥奪
  onClickdeleteadminister = member => {
    if (window.confirm(member.name + 'の管理者権限を剥奪しますか？')) {
      //解除処理
      fetch(this.testroute + '/deleteadminister', {
        method: 'POST',
        body: JSON.stringify([member.userid]),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          this.closeadministerModal()
          //メンバー更新
          this.loadmemberlist()
        })
    } else {
    }
  }
  //管理者候補変更
  onChangeaddministeroption = e => {
    for (const member of this.state.nonadministerlist) {
      if (member.name === e.target.value) {
        this.setState({
          addministeroption: member,
        })
        break
      }
    }
  }
  onClickadminister = () => {
    this.setState({
      isAddadminister: true,
    })
  }
  //管理者追加
  onClickaddAdminister = () => {
    const member = this.state.addministeroption
    if (window.confirm(member.name + 'に管理者権限を授与しますか？')) {
      //管理者登録処理
      fetch(this.testroute + '/addadminister', {
        method: 'POST',
        body: JSON.stringify([member.userid]),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          this.closeadministerModal()
          //メンバー更新
          this.loadmemberlist()
        })
    }
  }

  closeadministerModal = () => {
    this.setState({
      administerModalopen: false,
      isAddadminister: false,
    })
  }
}

export default Setting
