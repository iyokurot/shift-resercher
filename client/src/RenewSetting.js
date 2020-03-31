import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { UserContext } from './components/User'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import shareIcon from './images/share.svg'
import LoadingComponent from './reactComponents/loading'
import OfficialLine from './reactComponents/OfficialLine'

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
function RenewSetting(props) {
  const { state, dispatch } = React.useContext(UserContext)
  const [nowloading, setNowloading] = useState(true) //読み込み中
  const [inputUsername, setInputUsername] = useState(state.user.username) //ユーザー名
  const [worktime, setWorktime] = useState(state.user.worktime) //勤務区分
  const [isChangeWorktime, setIsChangeWorktime] = useState(false) //勤務区分判定
  const [memberlist, setMenberList] = useState([]) //ユーザーリスト
  const [nonadministerlist, setNonadministerList] = useState([]) //非管理者リスト
  const [administerlist, setAdministerList] = useState([]) //管理者リスト
  const [administeroption, setAdministerOption] = useState('') //管理者候補
  const [memberModalOpen, setMenberModalOpen] = useState(false) //ユーザーモーダル
  const [administerModalOpen, setAdministerModalOpen] = useState(false) //管理者モーダル
  const [isAddAdminister, setIsAddAdminister] = useState(false) //管理者追加
  const testrouter = ''
  useEffect(() => {
    const firstLoading = user => {
      setInputUsername(user.username)
      setWorktime(user.worktime)
      if (user.administer) {
        loadmemberlist()
      }
      setNowloading(false)
    }
    if (state.user.userId !== '') {
      firstLoading(state.user)
    } else {
      //state無しfetch
      fetch(testrouter + '/userdata')
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: 'set-user',
            payload: {
              user: data,
            },
          })

          firstLoading(data)
        })
    }
  }, [state.user])
  //メンバーリスト読み込み
  const loadmemberlist = () => {
    //管理者
    fetch(testrouter + '/memberlist')
      .then(res => res.json())
      .then(list => {
        setMenberList(list)
        const adlist = []
        const nonadlist = []
        for (let user of list) {
          if (user.administer) {
            adlist.push(user)
          } else {
            nonadlist.push(user)
          }
        }
        setAdministerList(adlist)
        setNonadministerList(nonadlist)
        setAdministerOption(nonadlist[0])
      })
  }
  //ユーザー名更新
  const updateUsername = () => {
    if (state.user.username !== inputUsername) {
      if (inputUsername === '') {
        alert('名前を入力してください')
      } else if (inputUsername.length > 10) {
        alert('10文字以内で入力してください')
      } else {
        //更新fetch
        fetch(testrouter + '/updateusername', {
          method: 'POST',
          body: JSON.stringify([inputUsername]),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        })
          .then(res => res.json())
          .then(str => {
            alert('登録しました')
          })

        const user = state.user
        user.username = inputUsername
        dispatch({
          type: 'set-user',
          payload: {
            user: user,
          },
        })
      }
    }
  }
  //勤務区分更新
  const resetWorktime = () => {
    if (state.user.worktime !== worktime) {
      //更新fetch
      fetch(testrouter + '/updateworktime', {
        method: 'POST',
        body: JSON.stringify([worktime]),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }).then(res => res.json())
      const user = state.user
      user.worktime = worktime
      dispatch({
        type: 'set-user',
        payload: {
          user: user,
        },
      })
    }
    setIsChangeWorktime(false)
  }
  //退会ボタン
  const onClickunsubsribe = () => {
    //退会確認
    if (window.confirm('退会しますか？\n全ユーザーデータが削除されます')) {
      fetch(testrouter + '/deleteuser', {
        method: 'POST',
        //body: "sub",
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }).then(res => res.json())
      fetch('/logout').then(res => res.json())
      props.history.push('/')
    }
  }
  //登録者削除
  const onClickdeletemember = member => {
    if (
      window.confirm(
        member.name +
          'を本当に削除しますか？\n該当ユーザーのシフト情報も削除されます',
      )
    ) {
      //削除処理
      fetch(testrouter + '/deletemember', {
        method: 'POST',
        body: JSON.stringify([member.userid]),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          setMenberModalOpen(false)
          //メンバー更新
          loadmemberlist()
        })
    }
  }
  //管理者権限剥奪
  const onClickdeleteadminister = member => {
    if (window.confirm(member.name + 'の管理者権限を剥奪しますか？')) {
      //解除処理
      fetch(testrouter + '/deleteadminister', {
        method: 'POST',
        body: JSON.stringify([member.userid]),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          setAdministerModalOpen(false)
          //メンバー更新
          loadmemberlist()
        })
    } else {
    }
  }
  //管理者候補変更
  const onChangeaddministeroption = e => {
    for (const member of nonadministerlist) {
      if (member.name === e.target.value) {
        setAdministerOption(member)
        break
      }
    }
  }
  //管理者追加
  const onClickaddAdminister = () => {
    const member = administeroption
    if (window.confirm(member.name + 'に管理者権限を授与しますか？')) {
      //管理者登録処理
      fetch(testrouter + '/addadminister', {
        method: 'POST',
        body: JSON.stringify([member.userid]),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          setAdministerModalOpen(false)
          setIsAddAdminister(false)
          //メンバー更新
          loadmemberlist()
        })
    }
  }
  return (
    <div>
      <h1>Settings</h1>
      {nowloading ? (
        <LoadingComponent />
      ) : (
        <div>
          <div className="profileholder">
            <div className="profilesetting">
              <div className="profilecard">
                <img
                  src={state.user.picture}
                  id="profileimage"
                  alt="profile"
                ></img>
                <p id="linename">{state.user.displayName}</p>
              </div>
              <div>
                ユーザー名
                <Input
                  id="username"
                  value={inputUsername}
                  onChange={e => setInputUsername(e.target.value)}
                  className={useStyles.input}
                  inputProps={{
                    'aria-label': 'username',
                  }}
                  placeholder="10文字以内"
                />
                <button
                  onClick={updateUsername}
                  className="bluebutton"
                  id="updatebutton"
                >
                  更新
                </button>
              </div>
              <div className="worktime">
                勤務区分:
                {isChangeWorktime ? (
                  <span>
                    <input
                      type="radio"
                      name="worktime"
                      value="早"
                      checked={worktime === '早'}
                      onChange={() => setWorktime('早')}
                    />
                    早番
                    <input
                      type="radio"
                      name="worktime"
                      value="遅"
                      checked={worktime === '遅'}
                      onChange={() => setWorktime('遅')}
                    />
                    遅番
                    <button onClick={resetWorktime} className="bluebutton">
                      更新
                    </button>
                  </span>
                ) : (
                  <span>
                    {state.user.worktime}番
                    <button
                      onClick={() => setIsChangeWorktime(true)}
                      className="bluebutton"
                    >
                      変更
                    </button>
                  </span>
                )}
              </div>
              <button
                onClick={onClickunsubsribe}
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
            className="manualdiv"
            onClick={e => props.history.push('/Contact')}
          >
            <span>お問い合わせ</span>
            <p id="sharesubtitle">管理者へ連絡</p>
          </div>
          <div
            className="manualdiv"
            onClick={e => props.history.push('/Game/CountGame')}
          >
            <span>ミニゲーム</span>
            <p id="sharesubtitle">おたのしみ</p>
          </div>
          <OfficialLine />
          <div
            style={{ display: state.user.administer ? '' : 'none' }}
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
              onClick={() => props.history.push('/ShiftAdministar')}
              className="administerbutton"
              style={{ width: '250px' }}
            >
              シフト変更登録
            </button>
            <br />
            <button
              onClick={() => props.history.push('/Information')}
              className="administerbutton"
              style={{ width: '250px' }}
            >
              お知らせ配信
            </button>
            <br />
            <button
              onClick={() => props.history.push('/Plans')}
              className="administerbutton"
              style={{ width: '250px' }}
            >
              予定登録
            </button>
            <br />
            <button
              onClick={() => props.history.push('/Log')}
              className="administerbutton"
              style={{ width: '250px' }}
            >
              ユーザーログ
            </button>
            <br />
            <button
              onClick={() => setMenberModalOpen(true)}
              className="administerbutton"
            >
              登録者一覧
            </button>
            <button
              onClick={() => setAdministerModalOpen(true)}
              className="administerbutton"
            >
              管理者一覧
            </button>
          </div>
          <Modal
            isOpen={memberModalOpen}
            onRequestClose={() => setMenberModalOpen(false)}
            style={customStyles}
            contentLabel="Register Modal"
          >
            <h2 className="modaltitle">登録者一覧</h2>
            <div className="modalheight">
              {memberlist.map(member => (
                <div key={member.userid}>
                  {member.name}
                  <span
                    style={{
                      display:
                        member.userid !== state.user.userId ? '' : 'none',
                    }}
                  >
                    <button
                      className="redbutton"
                      value={member.userid}
                      onClick={e => onClickdeletemember(member)}
                    >
                      登録削除
                    </button>
                  </span>
                </div>
              ))}
            </div>
            <button
              className="redbutton"
              onClick={() => setMenberModalOpen(false)}
            >
              閉じる
            </button>
          </Modal>
          <Modal
            isOpen={administerModalOpen}
            onRequestClose={() => setAdministerModalOpen(false)}
            style={customStyles}
            contentLabel="Administer Modal"
          >
            <h2 className="modaltitle">管理者一覧</h2>
            <div className="modalheight">
              {administerlist.map(member => (
                <div key={member.userid}>
                  {member.name}
                  <span
                    style={{
                      display:
                        member.userid !== state.user.userId ? '' : 'none',
                    }}
                  >
                    <button
                      className="redbutton"
                      onClick={() => onClickdeleteadminister(member)}
                    >
                      解除
                    </button>
                  </span>
                </div>
              ))}
            </div>
            {isAddAdminister && nonadministerlist.length > 0 ? (
              <span>
                <select
                  className="timeselect"
                  onChange={onChangeaddministeroption}
                  value={administeroption.name}
                >
                  {nonadministerlist.map(member => (
                    <option>{member.name}</option>
                  ))}
                </select>
                <button className="bluebutton" onClick={onClickaddAdminister}>
                  追加
                </button>
              </span>
            ) : (
              <button
                className="bluebutton"
                onClick={e => setIsAddAdminister(true)}
              >
                追加
              </button>
            )}

            <button
              className="redbutton"
              onClick={() => setAdministerModalOpen(false)}
            >
              閉じる
            </button>
          </Modal>
        </div>
      )}
    </div>
  )
}

export default RenewSetting
