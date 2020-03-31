import React, { Component } from 'react'
import LoadingComponent from './reactComponents/loading'
import {
  getWishReceptionDate,
  getPreReceptionDate,
  getBackReceptionDate,
  receptionText,
} from './components/ReceptionDate'
import './css/shiftText.css'
class Wishlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nowloading: true, //読み込み中
      accessable: false, //アクセス判定
      memberlist: [], //登録メンバー
      allshiftdata: [], //全シフト情報
      allcommentdata: [], //全コメント情報
      printlist: [], //表示するリスト
      printcommentlist: [], //表示するコメントリスト
      startdate: '',
      printdays: [], //表示する期間
    }
  }
  testroute = ''
  componentDidMount() {
    //アクセス判定
    //ユーザーデータ取得
    fetch(this.testroute + '/userdata')
      .then(res => res.json())
      .then(data => {
        if (data.administer) {
          //アクセス許可
          this.setState({
            accessable: true,
          })
          this.setdefaultDays()
          //全ユーザー取得
          fetch(this.testroute + '/memberlist')
            .then(res => res.json())
            .then(list => {
              this.setState({ memberlist: list })
              //全シフト情報取得
              fetch(this.testroute + '/allshiftdata')
                .then(res => res.json())
                .then(data => {
                  this.setState({ allshiftdata: data })
                  this.sortmembershift(list, data, this.state.startdate)
                })
              //全コメント取得
              fetch(this.testroute + '/allcommentdata')
                .then(res => res.json())
                .then(data => {
                  this.setState({
                    allcommentdata: data,
                    nowloading: false,
                  })
                  this.sortmembercomment(list, data, this.state.startdate)
                })
            })
        } else {
          //アクセス拒否
          this.setState({ nowloading: false })
        }
      })
  }
  render() {
    return (
      <div>
        {this.state.nowloading ? (
          <LoadingComponent />
        ) : (
          <div>
            {this.state.accessable ? (
              <div>
                <h1>Wishlist</h1>
                <div>
                  <button
                    className="redbutton"
                    style={{ width: '250px' }}
                    onClick={e => this.props.history.push('/SortMenber')}
                  >
                    ユーザー並び替え
                  </button>
                </div>
                シフト希望一覧　
                <span>
                  {this.state.startdate.getFullYear()}-
                  {receptionText(this.state.startdate)}
                </span>
                <br />
                <button
                  className="bluebutton"
                  value="pre"
                  onClick={this.onClickchangeterm}
                >
                  ◁
                </button>
                <button
                  className="bluebutton"
                  value="back"
                  onClick={this.onClickchangeterm}
                >
                  ▷
                </button>
                <div className="shittablediv">
                  <table className="shifttable">
                    <thead>
                      <tr>
                        <th className="blank">名前</th>
                        {this.state.printdays.map(day => (
                          <th key={day}>{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.printlist.map(member => (
                        <tr key={member.name}>
                          <th key={member.name}>{member.name}</th>
                          {member.shift.map(shift => (
                            <td className={this.shiftTextStyle(shift)}>
                              {shift}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="wishtablediv">
                  <h2>補足希望</h2>
                  <table className="wishtable">
                    <thead>
                      <tr className="tableheader">
                        <th className="tablename">名前</th>
                        <th className="tableday">日数</th>
                        <th className="tablecomment">追記</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.printcommentlist.map(comment => (
                        <tr key={comment.name}>
                          <td className="tablename">{comment.name}</td>
                          <td className="tableday">{comment.wishday}</td>
                          <td className="tablecommenttd">{comment.comment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>アクセスできません</div>
            )}
          </div>
        )}
      </div>
    )
  }
  //初期
  setdefaultDays = () => {
    //表示する期間開始日を計算
    this.setprintDays(getWishReceptionDate())
  }
  //表示期間前後ボタン
  onClickchangeterm = e => {
    const startdate = this.state.startdate
    const str = e.target.value
    let newstartdate = getWishReceptionDate()
    if (str === 'pre') {
      newstartdate = getPreReceptionDate(startdate)
    } else if (str === 'back') {
      newstartdate = getBackReceptionDate(startdate)
    }
    //const newstartdate = new Date(year, month, day)
    this.setState({ startdate: newstartdate })
    this.setprintDays(newstartdate)
    this.sortmembershift(
      this.state.memberlist,
      this.state.allshiftdata,
      newstartdate,
    )
    this.sortmembercomment(
      this.state.memberlist,
      this.state.allcommentdata,
      newstartdate,
    )
  }
  //表示期間計算
  setprintDays = startdate => {
    //表示する期間配列生成
    const days = []
    if (startdate.getDate() === 1) {
      for (let i = 0; i < 15; i++) {
        days.push(startdate.getMonth() + 1 + '/' + (startdate.getDate() + i))
      }
    } else if (startdate.getDate() === 16) {
      const findate = new Date(
        startdate.getFullYear(),
        startdate.getMonth() + 1,
        0,
      )
      for (let i = 0; i < findate.getDate() - startdate.getDate() + 1; i++) {
        days.push(startdate.getMonth() + 1 + '/' + (startdate.getDate() + i))
      }
    }
    this.setState({
      startdate: startdate,
      printdays: days,
    })
  }
  //表示用list作成（シフト
  sortmembershift = (members, shifts, startdate) => {
    const printdate = startdate
    let printfinaldate = ''
    let shiftlist = []
    if (printdate.getDate() === 1) {
      printfinaldate = new Date(
        printdate.getFullYear(),
        printdate.getMonth(),
        15,
      )
      shiftlist = Array(15)
    } else if (printdate.getDate() === 16) {
      printfinaldate = new Date(
        printdate.getFullYear(),
        printdate.getMonth() + 1,
        0,
      )
      shiftlist = Array(printfinaldate.getDate() - 15)
    }
    const membertoshift = []
    for (const member of members) {
      const myshift = shiftlist.slice()
      myshift.fill('/')

      for (const shift of shifts) {
        if (shift.userid === member.userid) {
          const sd = String(shift.date)
          const shiftyear = parseInt(sd.slice(0, 4))
          const shiftmonth = parseInt(sd.slice(4, 6))
          const shiftday = parseInt(sd.slice(6))
          if (
            shiftyear === printdate.getFullYear() &&
            shiftmonth === printdate.getMonth() + 1 &&
            shiftday >= printdate.getDate() &&
            shiftday <= printfinaldate.getDate()
          ) {
            //表示する情報
            if (shift.detail !== '') {
              //nullデータでない

              myshift[shiftday - printdate.getDate()] = shift.detail
            }
          }
        }
      }
      membertoshift.push({
        name: member.name,
        shift: myshift,
      })
    }
    this.setState({
      printlist: membertoshift,
    })
  }
  //表示用list作成（コメント
  sortmembercomment = (members, comments, startdate) => {
    const printdate = startdate
    const membertocomment = []
    for (const member of members) {
      let isAdd = false
      for (const com of comments) {
        if (member.userid === com.userid) {
          const commentdate = new Date(com.date)
          if (
            printdate.getFullYear() +
              '/' +
              printdate.getMonth() +
              '/' +
              printdate.getDate() ===
            commentdate.getFullYear() +
              '/' +
              commentdate.getMonth() +
              '/' +
              commentdate.getDate()
          ) {
            membertocomment.push({
              name: member.name,
              wishday: com.wishday,
              comment: com.text,
            })
            isAdd = true
            break
          }
        }
      }
      if (!isAdd) {
        membertocomment.push({
          name: member.name,
          wishday: '',
          comment: '',
        })
        isAdd = false
      }
    }
    this.setState({
      printcommentlist: membertocomment,
    })
  }
  //シフトstyle判別
  shiftTextStyle = shift => {
    if ('/' === shift) {
      return 'none'
    } else if ('x' === shift) {
      return 'batu'
    } else if ('△' === shift) {
      return 'sankaku'
    } else {
      return 'time'
    }
  }
}

export default Wishlist
