import React, { useState, useEffect } from 'react'
import './css/SortMenber.css'
import { UserContext } from './components/User'

function SortMenber(props) {
  const { state, dispatch } = React.useContext(UserContext)
  const [menbers, setMenbers] = useState([])
  const [menberlength, setMenberlength] = useState([])
  const [loadcounter, setLoadcounter] = useState(0)
  const testrouter = ''
  useEffect(() => {
    const loading = user => {
      //administer判別
      if (user.administer) {
        fetch(testrouter + '/memberlist')
          .then(res => res.json())
          .then(list => {
            setMenbers(list)
            const menberslist = []
            let maxNo = 0
            for (const i in list) {
              menberslist.push(i)
              if (maxNo < list[i].userno) {
                maxNo = list[i].userno
              }
            }
            //usernoのOverflow
            if (maxNo >= list.length) {
              for (let i = list.length; i <= maxNo; i++) {
                menberslist.push(i)
              }
            }
            setMenberlength(menberslist)
          })
      } else {
        props.history.push('/')
      }
    }
    if (state.user.userId !== '') {
      loading(state.user)
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
          loading(data)
        })
    }
  }, [loadcounter])
  const onChangeSelect = (id, no) => {
    //更新Fetch
    fetch(testrouter + '/updateuserno', {
      method: 'POST',
      body: JSON.stringify([{ id: id, no: no }]),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    }).then(res => res.json())
    const changeMenbers = menbers.slice()
    for (const menber of changeMenbers) {
      if (menber.userid === id) {
        menber.userno = no
        break
      }
    }
    setMenbers(changeMenbers)
  }
  return (
    <div>
      <h1>SortMenber</h1>
      <div id="explain">
        シフト一覧等で表示する
        <br />
        ユーザー順序を変更できます
      </div>
      <div className="sortdiv">
        <table className="sorttable">
          <thead>
            <tr>
              <th>名前</th>
              <th>区分</th>
              <th>順序No.</th>
            </tr>
          </thead>
          <tbody>
            {menbers.map(menber => (
              <tr key={menber.userid}>
                <td>{menber.name}</td>
                <td>{menber.worktime}</td>
                <td>
                  <select
                    value={menber.userno}
                    onChange={e =>
                      onChangeSelect(menber.userid, e.target.value)
                    }
                    key={menber.userid}
                    className="sortselect"
                  >
                    {menberlength.map(no => (
                      <option key={no}>{no}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="bluebutton"
        id="reloadsortmenber"
        onClick={e => setLoadcounter(loadcounter + 1)}
      >
        順序再読み込み
      </button>
    </div>
  )
}
export default SortMenber
