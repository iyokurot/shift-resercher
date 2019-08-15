import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';

class Homelocal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: [],
            date: new Date(),//today
            receptionDate: new Date(),//受付中
            clickdate: new Date(),//クリック
            stamp: "x",
            calendarlist: [],
            month_days: {
                20190814: { text: 'x' },
                20190820: { text: '17:00-23:00' }
            }
        }
        this.getDateReception = this.getDateReception.bind(this);
    }
    componentDidMount() {
        //ユーザーデータ取得
        fetch('/testuserdata')
            .then(res => res.json())
            .then(data => this.setState({ userdata: data }))
        this.getDate();
        this.getDateReception();

    }
    render() {
        return (
            <div>
                <h1>シフト希望</h1>
                ようこそ{this.state.userdata.username}さん
                <Link to="/Setting">設定</Link>

                <br></br>data確認------
                <div>{this.state.userdata.username}</div>
                <div>{this.state.userdata.userId}</div>
                <div>{this.state.userdata.displayName}</div>
                <div>{this.state.userdata.picture}</div>
                <div>{this.state.userdata.worktime}</div>
                <div>{this.state.userdata.administer}</div>
                ----------<br></br>
                <h2>{this.state.date.getFullYear()} {this.state.date.getMonth() + 1}月
                {this.state.receptionDate.getDate()}日～受付中</h2>

                <span id="dateText"></span>
                <button id="batu" onClick={this.onClickstamp.bind(this, "x")}>×</button>
                <button id="sankaku" onClick={this.onClickstamp.bind(this, "△")}>△</button>
                <button id="timeset" onClick={this.onClickstamp.bind(this, "time")}>Time</button>
                <div id="calendar"></div>
                <Calendar
                    locale="ja-JP"
                    calendarType="US"
                    value={this.state.date}
                    tileContent={this.getTileContent.bind(this)}
                    onChange={(value) => this.dayClick(value)}
                />

                <div>
                    補足希望
                    <form>
                        <span name="dataday" data-dataday="8/1"></span>
                        <input type="textarea" name="comment"></input>
                        <button>登録</button>
                    </form>
                </div>

            </div>
        );
    }

    getDate() {
        const weeks = ['日', '月', '火', '水', '木', '金', '土']
        const date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        console.log(year + "/" + month + "/" + date.getDate() + " " + weeks[date.getDay()]);
    }
    getFormatDate(date) {
        return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;
    }

    //受付中日にち
    getDateReception() {
        let day = this.state.date.getDate();
        var setday = this.state.date.getFullYear() + "/" + (this.state.date.getMonth() + 1);
        if (day > 10 && day < 24) {
            setday += "/16";
            this.setState({
                receptionDate: new Date(setday)
            })
        } else {
            setday += "/1";
            this.setState({
                receptionDate: new Date(setday)
            })
        }
    }
    getTileContent({ date, view }) {
        // 月表示のときのみ
        if (view !== 'month') {
            return null;
        }
        const day = this.getFormatDate(date);
        return (
            <p>

                {(this.state.month_days[day] && this.state.month_days[day].text) ?
                    this.state.month_days[day].text : '  '
                }
            </p>
        );
    }

    onClickstamp(value) {
        this.setState({
            stamp: value
        })
    }
    //日付クリック
    dayClick(value) {
        this.setState({ clickdate: value })
        //受付中か
        if (this.state.receptionDate <= value) {
            var dayslist = this.state.month_days;
            var clickday = value.getFullYear() + ("0" + (value.getMonth() + 1)).slice(-2) + ("0" + value.getDate()).slice(-2);
            //空or重複判定
            if (null == dayslist[clickday] || "" == dayslist[clickday].text) {
                //stampが記号か日付で分岐
                dayslist[clickday] = { text: this.state.stamp }
            } else if (this.state.stamp == dayslist[clickday].text) {
                dayslist[clickday] = { text: "" }
            } else if (this.state.stamp != dayslist[clickday].text) {
                //stampが記号か日付で分岐
                dayslist[clickday] = { text: this.state.stamp }
            }

            this.setState({ month_days: dayslist })
        }
    }

}

export default Homelocal;