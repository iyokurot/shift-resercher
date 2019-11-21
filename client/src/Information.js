import React, { Component } from 'react'
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
}
Modal.setAppElement('#root')

class Information extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newpost: false,
      userdata: [],
      informations: [],
      title: '',
      message: '',
      changeablemodal: false,
      modal: false,
      selectinfo: [],
    }
  }
  testroute = ''
  componentDidMount() {
    fetch(this.testroute + '/userdata')
      .then(res => res.json())
      .then(data => this.setState({ userdata: data }))
    this.fetchInfodata()
  }
  render() {
    return (
      <div>
        <h1>Information</h1>
        {this.state.userdata.administer ? (
          <button
            onClick={this.changeNewpost}
            className="administerbuttonreverse"
            style={{ width: '200px' }}
          >
            {this.state.newpost ? 'とじる △' : '新規投稿 ▽'}
          </button>
        ) : (
          ''
        )}
        {this.state.newpost ? (
          <div>
            タイトル
            <input
              id="newInfomationtitle"
              onChange={this.onChangeTitle}
              placeholder="17文字以内推奨"
            ></input>
            <br />
            <div id="newInfomessageFlame">
              <p id="newInfomessageTop">本文</p>
              <textarea
                id="newInfomessageText"
                onChange={this.onChangeMessage}
              ></textarea>
            </div>
            <br />
            <button
              onClick={this.addInformation}
              className="bluebutton"
              style={{ width: '200px' }}
            >
              投稿
            </button>
          </div>
        ) : (
          ''
        )}

        <div id="infoFlameHolder">
          <div id="infoFlame">
            <p id="infoTableHeader">お知らせ一覧</p>
            <table className="infoTable">
              <thead>
                {this.state.modal || this.state.changeablemodal ? (
                  <tr></tr>
                ) : (
                  <tr>
                    <th className="blank" id="infoTableth">
                      日付
                    </th>
                    <th className="blank" id="infoTablethtitle">
                      タイトル
                    </th>
                    {this.state.userdata.administer ? (
                      <th className="blank" id="infoTableth">
                        変更削除
                      </th>
                    ) : (
                      <th></th>
                    )}
                  </tr>
                )}
              </thead>
              <tbody>
                {this.state.informations.map(data => (
                  <tr key={data.id} id="infotr">
                    <td>
                      <button
                        value={data.id}
                        onClick={this.openModal}
                        className="infotablebutton"
                      >
                        {this.dateformater(data.date)}
                      </button>
                    </td>
                    <td>
                      <button
                        value={data.id}
                        onClick={this.openModal}
                        className="infotablebutton"
                      >
                        {data.title}
                      </button>
                    </td>
                    {this.state.userdata.administer ? (
                      <td>
                        <button
                          onClick={this.openChangeableModal}
                          className="bluebutton"
                          value={data.id}
                        >
                          変更
                        </button>
                        <button
                          onClick={this.deleteInfo}
                          className="redbutton"
                          value={data.id}
                        >
                          削除
                        </button>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          isOpen={this.state.modal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Register Modal"
        >
          <input
            id="informationTitle"
            value={this.state.selectinfo.title}
            readOnly
          ></input>
          <br />
          <div>投稿日 {this.dateformater(this.state.selectinfo.date)}</div>
          <div id="newInfomessageFlame">
            <p id="newInfomessageTop">本文</p>
            <textarea
              id="newInfomessageText"
              value={this.state.selectinfo.message}
              readOnly
            ></textarea>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.changeablemodal}
          onRequestClose={this.closeChangeableModal}
          style={customStyles}
          contentLabel="Register Modal"
        >
          <input
            id="informationTitle"
            onChange={this.updateTitle}
            value={this.state.selectinfo.title}
          ></input>
          <div>投稿日 {this.dateformater(this.state.selectinfo.date)}</div>
          <div id="newInfomessageFlame">
            <p id="newInfomessageTop">本文</p>
            <textarea
              id="newInfomessageText"
              value={this.state.selectinfo.message}
              onChange={this.updateMessage}
            ></textarea>
          </div>
          <br />
          <button
            onClick={this.updateInfo}
            className="bluebutton"
            style={{ width: '120px' }}
          >
            変更
          </button>
          <button
            onClick={this.closeChangeableModal}
            className="redbutton"
            style={{ width: '120px' }}
          >
            閉じる
          </button>
        </Modal>
      </div>
    )
  }
  //infoFetch
  fetchInfodata = () => {
    fetch(this.testroute + '/informationdata')
      .then(res => res.json())
      .then(data => this.setState({ informations: data }))
  }
  //新規投稿flag
  changeNewpost = () => {
    if (this.state.newpost) {
      this.setState({
        newpost: false,
      })
    } else {
      this.setState({
        newpost: true,
      })
    }
  }
  //タイトル
  onChangeTitle = e => {
    this.setState({
      title: e.target.value,
    })
  }
  //本文
  onChangeMessage = e => {
    this.setState({
      message: e.target.value,
    })
  }
  //新規投稿
  addInformation = () => {
    if (this.state.title === '') {
      alert('タイトルを記入してください')
    } else {
      //
      const data = {
        title: this.state.title,
        message: this.state.message,
      }
      console.log(data)
      fetch(this.testroute + '/addinformationdata', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          alert('投稿しました')
          this.fetchInfodata()
        })
    }
  }
  //YYYY/MM/dd変換
  dateformater = date => {
    const format = new Date(date)
    return (
      format.getFullYear() +
      '/' +
      (format.getMonth() + 1) +
      '/' +
      format.getDate()
    )
  }
  openModal = e => {
    this.setState({
      modal: true,
      selectinfo: this.serchInfobyId(e.target.value),
    })
  }
  closeModal = () => {
    this.setState({
      modal: false,
    })
  }
  //変更モーダル
  openChangeableModal = e => {
    this.setState({
      changeablemodal: true,
      selectinfo: this.serchInfobyId(e.target.value),
    })
  }
  closeChangeableModal = () => {
    this.setState({
      changeablemodal: false,
    })
  }
  //idからInfo
  serchInfobyId = id => {
    for (const info of this.state.informations) {
      if (parseInt(id) === info.id) {
        return Object.assign({}, info)
      }
    }
    return
  }
  //変更タイトル
  updateTitle = e => {
    let info = this.state.selectinfo
    info.title = e.target.value
    this.setState({
      selectinfo: info,
    })
  }
  //変更内容
  updateMessage = e => {
    let info = this.state.selectinfo
    info.message = e.target.value
    this.setState({
      selectinfo: info,
    })
  }
  //変更
  updateInfo = () => {
    const after = this.state.selectinfo
    const before = this.serchInfobyId(after.id)
    if (before.title === after.title && before.message === after.message) {
      //変更なし
    } else {
      //更新処理
      fetch(this.testroute + '/updateinformationdata', {
        method: 'POST',
        body: JSON.stringify(after),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          alert('更新しました')
          this.closeChangeableModal()
          this.fetchInfodata()
        })
    }
  }
  //削除
  deleteInfo = e => {
    if (window.confirm('削除しますか？')) {
      //削除処理
      fetch(this.testroute + '/deleteinformationdata', {
        method: 'POST',
        body: JSON.stringify([e.target.value]),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(res => {
          alert('削除しました')
          this.fetchInfodata()
        })
    }
  }
}

export default Information
