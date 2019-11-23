import React, { Component } from 'react'
import Modal from 'react-modal'
import Information from './HomeInformation'
import NewCalender from './Calender'
import Comment from './HomeComment'
import { GetDateByNum, GetFormatDate } from './DateHandler'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  formcontrol: {
    fontSize: '10px',
  },
}
Modal.setAppElement('#root')

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userdata: [], //ユーザー情報
      date: new Date(), //today
      receptionDate: new Date(), //受付中
      stamp: 'x', //シフトに記入する文字
      stamptime: '', //時間希望
      deadline: '', //締め切り
      default_month_days: [], //defaultのシフト情報
      month_days: [], //更新されるシフト情報
      shifttimes: [
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30',
        '23:45',
      ], //選択可能時間
      startTime: '09:00',
      endTime: '09:00',
      nowprintday: new Date(),
      //nowprintcommentday: '',
      modalIsOpen: false, //モーダル判定
      isUpdateshift: [], //シフト更新
      //informations: [], //おしらせ3件
      isNowLoading: true, //読み込み中(シフト)
      plans: [], //予定リスト
      registModal: false, //登録後モーダル
      newregistshift: [], //新規登録シフトリスト
      updateregistshift: [], //更新登録シフトリスト
      deleteregistshift: [], //削除登録シフトリスト
      isNotSaveShift: false, //未登録シフト存在
    }
  }
  deadlineEarly = 10
  deadlineLate = 24
  testrouter = '' //testroute
  componentDidMount() {
    this.getDateReception()
    //ユーザーデータ取得
    fetch(this.testrouter + '/userdata')
      .then(res => res.json())
      .then(data => this.setState({ userdata: data }))
    this.loadShiftAndComment()
    //予定データ取得
    fetch(this.testrouter + '/plandata')
      .then(res => res.json())
      .then(plans => this.setPlans(plans))
    window.addEventListener('beforeunload', this.beforeUnload)
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeUnload)
  }
  render() {
    return (
      <div>
        <div id="personalheader">
          <span id="setting" onClick={e => this.pushtoSetting()}>
            <div id="settingimg"></div>
          </span>
          <a href="/logout">
            <span className="redbutton">ログアウト</span>
          </a>
        </div>
        <h1 id="HomeTitle">Home</h1>
        ようこそ！{this.state.userdata.username}さん
        <h2 className="reception">
          {this.state.receptionDate.getFullYear()}{' '}
          {this.state.receptionDate.getMonth() + 1}月
          {this.state.receptionDate.getDate()}日～受付中
        </h2>
        <div id="dateText">{this.state.deadline}</div>
        <Information push={this.pushtoInfomation} />
        <div className="itemholder">
          <button
            className="redbutton"
            onClick={this.onClickstamp.bind(this, 'x')}
          >
            ✕
          </button>
          <button
            className="greenbutton"
            onClick={this.onClickstamp.bind(this, '△')}
          >
            △
          </button>
          <button
            className="bluebutton"
            onClick={this.onClickstamp.bind(this, 'time')}
          >
            時間指定
          </button>
        </div>
        {this.state.isNowLoading ? (
          <div className="loading">
            <span className="loadingtext">Loading...</span>
            <div className="orbit-spinner">
              <div className="orbit"></div>
              <div className="orbit"></div>
              <div className="orbit"></div>
            </div>
          </div>
        ) : (
          <div id="shift-holder">
            <div id="newcalendar">
              <NewCalender
                receptionDate={this.state.nowprintday}
                plans={this.state.plans}
                shifts={this.state.month_days}
                onChange={value => this.dayClick(value)}
                setPrintdate={value => this.setPrindDay(value)}
              />
            </div>

            <Comment
              receptionDate={this.state.receptionDate}
              addbutton={this.addDataOnClick}
            />
          </div>
        )}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="worktime Modal"
        >
          <h2 className="modaltitle">出勤可能時間を選択</h2>
          <div>
            <select
              className="timeselect"
              onChange={this.startTimeChange}
              value={this.state.startTime}
            >
              {this.state.shifttimes.map(time => (
                <option key={time}>{time}</option>
              ))}
            </select>
            ～
            <select
              className="timeselect"
              onChange={this.endTimeChange}
              value={this.state.endTime}
            >
              {this.state.shifttimes.map(time => (
                <option key={time}>{time}</option>
              ))}
            </select>
          </div>
          <button className="redbutton" onClick={this.closeModal}>
            閉じる
          </button>
          <button className="bluebutton" onClick={this.setShiftTime}>
            決定
          </button>
        </Modal>
        <Modal
          isOpen={this.state.registModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeRegistModal}
          style={customStyles}
          contentLabel="worktime Modal"
        >
          <h2 className="modaltitle">登録しました</h2>
          <div className="modalheight">
            {this.state.newregistshift.map(shift => (
              <div key={shift.date} id="newshiftregist">
                {GetDateByNum(shift.date) + ' '} {shift.text + ' '}登録
              </div>
            ))}
            {this.state.updateregistshift.map(shift => (
              <div key={shift.date} id="updateshiftregist">
                {GetDateByNum(shift.date) + ' '} {shift.text + ' '}更新
              </div>
            ))}
            {this.state.deleteregistshift.map(shift => (
              <div key={shift.date} id="deleteshiftregist">
                {GetDateByNum(shift.date) + ' '}削除
              </div>
            ))}
          </div>
          <button className="redbutton" onClick={this.closeRegistModal}>
            閉じる
          </button>
        </Modal>
      </div>
    )
  }
  /*
  <div id="calendar">
              <Calendar
                locale="ja-JP"
                calendarType="US"
                value={this.state.receptionDate}
                tileContent={this.getTileContent.bind(this)}
                onChange={value => this.dayClick(value)}
              />
            </div>
  */
  loadShiftAndComment = () => {
    //シフトデータ取得
    fetch(this.testrouter + '/shiftdata')
      .then(res => res.json())
      .then(data => this.setdefaultshifts(data))
  }
  //json変換
  setdefaultshifts = data => {
    const deflist = []
    for (const shift of data) {
      deflist[shift.date] = { text: shift.detail }
    }
    this.setState({
      default_month_days: deflist,
      month_days: deflist.slice(),
      isNowLoading: false,
    })
  }
  setPlans = plans => {
    const list = []
    for (let plan of plans) {
      list[plan.date] = { text: plan.text }
    }
    this.setState({
      plans: list,
    })
  }
  //受付中日にち
  getDateReception = () => {
    let year = this.state.date.getFullYear()
    let month = this.state.date.getMonth() + 1
    const day = this.state.date.getDate()
    let receptionday = ''
    let deadline = ''
    let setday = ''
    if (day <= this.deadlineEarly) {
      //締め切り
      const finaldate = new Date(year, month, 0)
      receptionday = month + '/16～' + month + '/' + finaldate.getDate()
      deadline = month + '/10まで(' + receptionday + ')'
      //今月16～末日まで
      setday = year + '/' + month + '/16'
    } else if (day > this.deadlineLate) {
      //年越し処理
      if (month === 12) {
        year++
        month = 0
      }
      //締め切り
      const finaldate = new Date(year, month + 1, 0)
      receptionday =
        month + 1 + '/16～' + (month + 1) + '/' + finaldate.getDate()
      deadline = month + 1 + '/10まで(' + receptionday + ')'
      //来月16～末日
      setday = year + '/' + (month + 1) + '/16'
    } else {
      //年越し処理
      if (month === 12) {
        year++
        month = 0
      }
      //締め切り
      receptionday = month + 1 + '/1～' + (month + 1) + '/15'
      deadline = month + '/24まで(' + receptionday + ')'
      //来月1～15まで
      setday = year + '/' + (month + 1) + '/1'
    }
    this.setState({
      complementdaysText: receptionday,
      deadline: deadline,
      receptionDate: new Date(setday),
      nowprintday: new Date(setday),
    })
  }
  /*
  getTileContent = ({ date, view }) => {
    // 月表示のときのみ
    if (view !== 'month') {
      return null
    }
    const day = this.getFormatDate(date)
    return (
      <p className="calendaritem">
        {this.state.month_days[day] && this.state.month_days[day].text
          ? this.state.month_days[day].text
          : '  '}
      </p>
    )
  }
*/
  //スタンプ変換
  onClickstamp = value => {
    this.setState({
      stamp: value,
    })
  }
  //日付クリック
  dayClick = value => {
    //受付中か
    if (this.state.receptionDate <= value) {
      const dayslist = this.state.month_days
      const clickday = GetFormatDate(value)
      this.setState({ clickdate: clickday })
      //空or重複判定
      if (null == dayslist[clickday] || '' === dayslist[clickday].text) {
        //stampが記号か日付で分岐
        if (this.state.stamp === 'time') {
          this.openModal()
        } else {
          dayslist[clickday] = { text: this.state.stamp }
          this.setState({ month_days: dayslist })
        }
        //stamp一致クリック
      } else if (this.state.stamp === dayslist[clickday].text) {
        dayslist[clickday] = { text: '' }
        this.setState({ month_days: dayslist })
      } else if (this.state.stamp !== dayslist[clickday].text) {
        //stampが記号か日付で分岐
        if (this.state.stamp === 'time') {
          dayslist[clickday] = { text: '' }
        } else {
          dayslist[clickday] = { text: this.state.stamp }
          this.setState({ month_days: dayslist })
        }
      }
    }
    //未保存判定
    if (!this.state.isNotSaveShift) {
      this.setState({
        isNotSaveShift: true,
      })
    }
  }
  setPrindDay = date => {
    this.setState({
      nowprintday: date,
    })
  }
  wishdayOnchange = e => {
    this.setState({
      wishday: e.target.value,
    })
  }

  //モーダル関連
  openModal = () => {
    this.setState({ modalIsOpen: true })
  }
  afterOpenModal() {
    //モーダルオープン後処理
  }
  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }
  setShiftTime = () => {
    if (this.state.startTime >= this.state.endTime) {
      alert('不可能な時間です')
    } else {
      this.closeModal()
      const dayslist = this.state.month_days
      dayslist[this.state.clickdate] = {
        text: this.state.startTime + '-' + this.state.endTime,
      }
      this.setState({ month_days: dayslist })
    }
  }
  startTimeChange = e => {
    this.setState({
      startTime: e.target.value,
    })
  }
  endTimeChange = e => {
    this.setState({
      endTime: e.target.value,
    })
  }
  //登録ボタン
  addDataOnClick = async () => {
    this.setState({
      isNowLoading: true,
      isNotSaveShift: false,
    })
    await new Promise(resolve => setTimeout(resolve, 0))
    this.registMethod()
  }
  //登録処理関数
  registMethod = async () => {
    const results = [] //PromiseList
    const defshift = this.state.default_month_days.slice()
    const newshift = this.state.month_days.slice()
    const newshiftdata = []
    //追加されたシフト情報
    for (const shiftday in newshift) {
      if (defshift[shiftday] == null && newshift[shiftday].text !== '') {
        newshiftdata.push({ date: shiftday, text: newshift[shiftday].text })
      }
    }
    this.setState({
      newregistshift: newshiftdata,
    })

    //削除されたシフト情報
    const deleteshiftdata = []
    for (const shiftday in defshift) {
      if (newshift[shiftday].text === '') {
        deleteshiftdata.push({ date: shiftday, text: defshift[shiftday].text })
        delete newshift[shiftday]
      }
    }
    this.setState({
      deleteregistshift: deleteshiftdata,
      default_month_days: newshift,
    })

    //更新されたシフト情報
    const updateshiftdata = []
    for (const shiftday in newshift) {
      if (
        defshift[shiftday] != null &&
        newshift[shiftday].text !== '' &&
        defshift[shiftday].text !== newshift[shiftday].text
      ) {
        updateshiftdata.push({ date: shiftday, text: newshift[shiftday].text })
      }
    }
    this.setState({
      updateregistshift: updateshiftdata,
    })

    //update
    if (updateshiftdata.length > 0) {
      results.push(
        this.dbUpdater(this.testrouter + '/updateshiftdata', updateshiftdata),
      )
    }
    //add
    if (newshiftdata.length > 0) {
      results.push(
        this.dbUpdater(this.testrouter + '/addshiftdata', newshiftdata),
      )
    }

    //delete
    if (deleteshiftdata.length > 0) {
      results.push(
        this.dbUpdater(this.testrouter + '/deleteshiftdata', deleteshiftdata),
      )
    }

    await Promise.all(results)
    //登録確認モーダル
    this.setState({
      registModal: true,
    })

    //非同期処理後、Reload
    //const start = performance.now()

    //const end = performance.now()
    //console.log(end - start)
    await new Promise(resolve => setTimeout(resolve, 500))
    this.loadShiftAndComment()
  }
  closeRegistModal = () => {
    this.setState({
      registModal: false,
      newregistshift: [],
      updateregistshift: [],
      deleteregistshift: [],
    })
  }
  //shiftDB更新用fetch
  dbUpdater = (url, data) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    }).then(res => res.json())
  }
  pushtoInfomation = () => {
    if (this.state.isNotSaveShift) {
      if (window.confirm('未保存のシフトがありますが移動しますか？')) {
        this.props.history.push('/Information')
      }
    } else {
      this.props.history.push('/Information')
    }
  }
  pushtoSetting = () => {
    if (this.state.isNotSaveShift) {
      if (window.confirm('未保存のシフトがありますが移動しますか？')) {
        this.props.history.push('/Setting')
      }
    } else {
      this.props.history.push('/Setting')
    }
  }
  //未保存アラート
  beforeUnload = e => {
    //未登録shiftがあるか
    let message = ''
    if (this.state.isNotSaveShift) {
      e.preventDefault()
      message = '未保存のシフトがありますが移動しますか？'
      e.returnValue = message
    }
    return message
  }
}

export default Home
