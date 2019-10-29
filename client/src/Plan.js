import React, { Component } from 'react'
import SimpleDatePicker from './PlanDatePicker'
import Modal from 'react-modal'
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

export default class Plan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plans: [], //予定リスト
      selectdate: new Date(), //新規Plan日付
      addplanText: '', //新規Planテキスト
      isOpenModal: false,
      changePlandate: '', //変更対象日付
      changePlantext: '',
      test: '',
    }
  }
  componentDidMount() {
    fetch('userdata')
      //fetch('testuserdata')
      .then(res => res.json())
      .then(data => {
        if (data.administer) {
          //アクセス許可
          this.loadPlans()
        } else {
          //アクセス不可
          alert('アクセスできません')
          this.props.history.push('/')
        }
      })
  }
  loadPlans = () => {
    fetch('plandata')
      //fetch('testplandata')
      .then(res => res.json())
      .then(data => this.setPlans(data))
  }
  //Planlist作成
  setPlans = plans => {
    const list = []
    for (let plan of plans) {
      list[plan.date] = { text: plan.text, date: plan.date }
    }
    this.setState({
      plans: list,
    })
  }
  //追加Date
  onChangeSelectDate = date => {
    this.setState({
      selectdate: date,
    })
  }
  //追加Text
  onChangeAddText = e => {
    this.setState({
      addplanText: e.target.value,
    })
  }
  test = e => {
    this.setState({
      test: e.target.value,
    })
  }
  //追加ボタン
  onClickAddPlan = () => {
    //空欄判定
    if (this.state.addplanText === '') {
      alert('予定を入力してください')
      return
    }
    const adddate = this.getFormatDate(this.state.selectdate)
    const data = {
      text: this.state.addplanText,
      date: adddate,
    }
    //存在判定
    if (this.state.plans[adddate]) {
      //上書き確認
      if (
        window.confirm(
          'すでに予定が登録されていますが、上書きしますか？\n' +
            '予定：「' +
            this.state.plans[adddate].text +
            '」',
        )
      ) {
        //上書き
        fetch('/updateaddplandata', {
          //fetch('/testupdateaddplandata', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        })
          .then(res => res.json())
          .then(str => {
            alert('上書きしました')
            this.loadPlans()
          })
      }
      return
    }
    //追加処理
    //追加fetch
    fetch('/addplandata', {
      //fetch('/testaddplandata', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(res => res.json())
      .then(str => {
        alert('追加しました')
        this.loadPlans()
      })
  }
  onClickDeletePlan = date => {
    if (
      window.confirm(
        '削除しますか？\n予定：「' + this.state.plans[date].text + '」',
      )
    ) {
      //削除
      fetch('/deleteplandata', {
        //fetch('/testdeleteplandata', {
        method: 'POST',
        body: JSON.stringify([date]),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(str => {
          this.loadPlans()
        })
    }
  }
  //yyyyMMdd
  getFormatDate(date) {
    return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${(
      '0' + date.getDate()
    ).slice(-2)}`
  }
  openModal = date => {
    this.setState({
      isOpenModal: true,
      changePlandate: date,
      changePlantext: this.state.plans[date].text,
    })
  }
  closeModal = () => {
    this.setState({
      isOpenModal: false,
    })
  }
  onChangereplaceText = e => {
    this.setState({
      changePlantext: e.target.value,
    })
  }
  onClickUpdatePlan = () => {
    if (this.state.changePlantext === '') {
      alert('空欄です')
      return
    }
    const data = {
      text: this.state.changePlantext,
      date: this.state.changePlandate,
    }
    //更新Fetch
    fetch('/updateaddplandata', {
      //fetch('/testupdateaddplandata', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
      .then(res => res.json())
      .then(str => {
        this.loadPlans()
      })
    this.closeModal()
  }
  render() {
    return (
      <div>
        <h1>Plan</h1>
        <div className="flame" id="plan-addflame">
          <p id="addplanTitle">予定追加</p>
          <span id="namesubtitle">各日付につき１件のみ</span>
          <div>
            日付
            <SimpleDatePicker
              onChange={date => this.onChangeSelectDate(date)}
            />
          </div>
          <div>
            <input
              placeholder="予定を入力(４文字以内)"
              className="plan-input"
              maxLength="4"
              value={this.state.addplanText}
              onChange={this.onChangeAddText}
            />
          </div>
          <button
            className="bluebutton"
            id="plan-addbutton"
            onClick={this.onClickAddPlan}
          >
            追加
          </button>
        </div>
        <div>
          <span>リスト</span>
          <span>カレンダー</span>
        </div>
        <div className="plantable-holder">
          <table className="plantable">
            <thead>
              <tr className="plantable-head">
                <td>日付</td>
                <td>予定</td>
                <td>削除</td>
                <td>変更</td>
              </tr>
            </thead>
            <tbody className="plantable-tbody">
              {this.state.plans.map(plan => (
                <tr key={plan.date}>
                  <td className="plantable-td">{plan.date}</td>
                  <td className="plantable-td">{plan.text}</td>
                  <td className="plantable-td">
                    <button
                      className="redbutton"
                      onClick={() => this.onClickDeletePlan(plan.date)}
                    >
                      削除
                    </button>
                  </td>
                  <td>
                    <button
                      className="bluebutton"
                      onClick={() => this.openModal(plan.date)}
                    >
                      変更
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={this.state.isOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="worktime Modal"
        >
          <h2 className="modaltitle">変更</h2>
          <div>
            {this.state.changePlandate}
            <br />
            <input
              value={this.state.changePlantext}
              onChange={this.onChangereplaceText}
              maxLength="4"
            ></input>
          </div>
          <button className="redbutton" onClick={this.closeModal}>
            閉じる
          </button>
          <button className="bluebutton" onClick={this.onClickUpdatePlan}>
            変更
          </button>
        </Modal>
      </div>
    )
  }
}
