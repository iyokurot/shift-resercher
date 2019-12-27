import React, { useState, useEffect, useContext } from 'react'
import { GetSlashFormatDate } from './DateHandler'
import LoadingComponent from './reactComponents/loading'
import { UserContext } from './components/User'

const Log = props => {
  const { state, dispatch } = useContext(UserContext)
  const [isNowloading, setIsNowloading] = useState(true)
  const [userlist, setUserlist] = useState([])
  const [logdata, setLogdata] = useState([])
  const testroute = ''
  useEffect(() => {
    if (state.user.userId !== '') {
      firstLoad(state.user)
    } else {
      //state無しfetch
      fetch(testroute + '/userdata')
        .then(res => res.json())
        .then(res => {
          dispatch({
            type: 'set-user',
            payload: {
              user: res,
            },
          })
          firstLoad(res)
        })
    }
  }, [props])
  const firstLoad = user => {
    if (user.administer) {
      //管理者
      fetch(testroute + '/memberlist')
        .then(res => res.json())
        .then(data => setUserlist(data))
      fetch(testroute + '/getlogdata')
        .then(res => res.json())
        .then(data => setLogdata(data))
      setIsNowloading(false)
    } else {
      //Not管理者
      alert('ページを開けません')
      props.history.push('/')
    }
  }
  //idからユーザー名取得
  const getNameById = id => {
    for (const user of userlist) {
      if (id === user.userid) {
        return user.name
      }
    }
    return 'Not Exist'
  }
  //KeyFont
  const isdeletefont = key => {
    if (key.search(/削除|剥奪|退会/) !== -1) {
      return 'logtable-td-delete'
    } else if (key.search(/ログイン/) !== -1) {
      return 'logtable-td-login'
    } else if (key.search(/変更|更新/) !== -1) {
      return 'logtable-td-update'
    } else return 'logtable-td-key'
  }
  //実行ユーザー不明Font
  const isNotexist = user => {
    if (user === 'Not Exist') {
      return 'logtable-td-delete'
    } else return 'logtable-td-user'
  }
  //detailがidの際username表示
  const getDetailIfId = (key, detail) => {
    if (key === '管理者追加' || key === '管理者剥奪') {
      return 'user[' + getNameById(detail) + ']'
    } else if (key === 'ユーザー削除') {
      return 'deleted'
    } else return detail
  }
  //detailのFont
  const detailFont = (key, detail) => {
    if (key.search(/ログイン/) !== -1) {
      return 'logtable-td-login-detail'
    } else if (key.search(/削除|剥奪|退会/) !== -1) {
      return 'logtable-td-delete-detail'
    } else if (key.search(/変更|更新/) !== -1) {
      return 'logtable-td-update-detail'
    } else return 'logtable-td-detail'
  }
  return (
    <div>
      <h1>Logs</h1>
      {isNowloading ? (
        <LoadingComponent />
      ) : (
        <div className="black-background">
          <p className="logtitle">ユーザーログリスト</p>
          <table className="logtable">
            <thead>
              <tr>
                <th className="logtable-td-date">日付</th>
                <th className="logtable-td-user">実行ユーザー</th>
                <th className="logtable-td-key">処理</th>
                <th className="logtable-td-detail">内容</th>
              </tr>
            </thead>
            <tbody>
              {logdata.map(log => (
                <tr key={log.id}>
                  <td className="logtable-td-date">
                    {GetSlashFormatDate(log.date)}
                  </td>
                  <td className={isNotexist(getNameById(log.userid))}>
                    {getNameById(log.userid)}
                  </td>
                  <td className={isdeletefont(log.key)}>{log.key}</td>
                  <td
                    className={detailFont(
                      log.key,
                      getDetailIfId(log.key, log.detail),
                    )}
                  >
                    {getDetailIfId(log.key, log.detail)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
export default Log
