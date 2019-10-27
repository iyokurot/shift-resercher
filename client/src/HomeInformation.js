import React, { Component } from 'react'

export default class HomeInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      informations: [],
    }
  }
  componentDidMount() {
    //お知らせ３件取得
    fetch('/informationdatathree')
      //fetch('/testinformationdatathree')
      .then(res => res.json())
      .then(data => this.setState({ informations: data }))
  }
  render() {
    return (
      <div id="infoFlameHolder">
        <div id="infoFlame">
          <span id="infoTitle">おしらせ</span>
          <div>
            <table id="infotable">
              <tbody>
                {this.state.informations.map(info => (
                  <tr key={info.id}>
                    <td id="infotabledate">
                      {this.slashformatDate(info.date)}
                    </td>
                    <td id="infotabletitle">
                      <span>{info.title}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="lightgreenbutton" onClick={this.props.push}>
            一覧へ
          </button>
        </div>
      </div>
    )
  }
  //yyyy/mm/dd
  slashformatDate(str) {
    const date = new Date(str)
    return (
      date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    )
  }
}
