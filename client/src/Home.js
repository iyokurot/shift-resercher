import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root')

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: [],//ユーザー情報
            date: new Date(),//today
            receptionDate: new Date(),//受付中
            stamp: "x",//シフトに記入する文字
            stamptime: "",//時間希望
            deadline: "",//締め切り
            default_month_days: [],//defaultのシフト情報
            month_days: [],//更新されるシフト情報
            shifttimes: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
                "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
                "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
                "22:00", "22:30", "23:00", "23:30", "23:45"],//選択可能時間
            startTime: "09:00",
            endTime: "09:00",
            comment: "",//希望コメント
            modalIsOpen: false,//モーダル判定
            isUpdateshift: []//シフト更新
        }
        this.setdefaultshifts = this.setdefaultshifts.bind(this);
        this.getDateReception = this.getDateReception.bind(this);
        this.commentOnchange = this.commentOnchange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.setShiftTime = this.setShiftTime.bind(this);
        this.startTimeChange = this.startTimeChange.bind(this);
        this.endTimeChange = this.endTimeChange.bind(this);
        this.addDataOnClick = this.addDataOnClick.bind(this);
        this.shiftupdateChecker = this.shiftupdateChecker.bind(this);

    }
    componentDidMount() {
        this.getDateReception();
        //ユーザーデータ取得
        fetch('/userdata')
            .then(res => res.json())
            .then(data => this.setState({ userdata: data }))
        //シフトデータ取得
        fetch('/shiftdata')
            .then(res => res.json())
            .then(data => this.setdefaultshifts(data))
        //コメントデータ取得
        fetch('/getcommentdata')
            .then(res => res.json())
            .then(data => this.setState({ comment: data[0].text }))
    }
    render() {
        return (
            <div>
                <h1>シフト希望</h1>
                ようこそ{this.state.userdata.username}さん
                <Link to="/Setting">設定</Link>
                <a href="/logout">logout</a>
                <h2>{this.state.receptionDate.getFullYear()} {this.state.receptionDate.getMonth() + 1}月
                {this.state.receptionDate.getDate()}日～受付中</h2>

                <div id="dateText">{this.state.deadline}</div>
                <button id="batu" onClick={this.onClickstamp.bind(this, "x")}>×</button>
                <button id="sankaku" onClick={this.onClickstamp.bind(this, "△")}>△</button>
                <button id="timeset" onClick={this.onClickstamp.bind(this, "time")}>Time</button>
                <div id="calendar"></div>
                <Calendar
                    locale="ja-JP"
                    calendarType="US"
                    value={this.state.receptionDate}
                    tileContent={this.getTileContent.bind(this)}
                    onChange={(value) => this.dayClick(value)}
                />

                <div>
                    補足希望
                    <input type="textarea" name="comment" value={this.state.comment} onChange={this.commentOnchange}></input>
                    <button onClick={this.addDataOnClick}>登録</button>
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="worktime Modal"
                >
                    <h2>出勤可能時間を選択</h2>
                    <div>
                        <select onChange={this.startTimeChange} value={this.state.startTime}>
                            {this.state.shifttimes.map(time =>
                                <option key={time}>{time}</option>
                            )}
                        </select>～
                    <select onChange={this.endTimeChange} value={this.state.endTime}>
                            {this.state.shifttimes.map(time =>
                                <option key={time}>{time}</option>
                            )}
                        </select>
                    </div>
                    <button onClick={this.closeModal}>閉じる</button>
                    <button onClick={this.setShiftTime}>決定</button>
                </Modal>
            </div>
        );
    }
    //json変換
    setdefaultshifts(data) {
        const deflist = [];
        const list = [];
        for (let shift of data) {
            list[shift.date] = { text: shift.detail }
            deflist[shift.date] = { text: shift.detail }
        }
        this.setState({
            default_month_days: deflist,
            month_days: list
        })
    }
    getFormatDate(date) {
        return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;
    }
    //受付中日にち
    getDateReception() {
        let year = this.state.date.getFullYear();
        let month = this.state.date.getMonth() + 1;
        const day = this.state.date.getDate();
        let deadline = "";
        let setday = "";
        if (day <= 10) {
            //締め切り
            const finaldate = new Date(year, month, 0);
            deadline = month + "/10まで(" + month + "/16～" + month + "/" + finaldate.getDate() + ")"
            //今月16～末日まで
            setday = year + "/" + month + "/16";
        } else if (day > 24) {
            //年越し処理
            if (month === 12) {
                year++;
                month = 0;
            }
            //締め切り
            const finaldate = new Date(year, month, 0);
            deadline = (month + 1) + "/10まで(" + (month + 1) + "/16～" + (month + 1) + "/" + finaldate.getDate() + ")"
            //来月16～末日
            setday = year + "/" + (month + 1) + "/16";
        } else {
            //年越し処理
            if (month === 12) {
                year++;
                month = 0;
            }
            //締め切り
            deadline = month + "/24まで(" + (month + 1) + "/1～" + (month + 1) + "/15)"
            //来月1～15まで
            setday = year + "/" + (month + 1) + "/1";
        }
        this.setState({
            deadline: deadline,
            receptionDate: new Date(setday)
        })
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

    //スタンプ変換
    onClickstamp(value) {
        this.setState({
            stamp: value
        })
    }
    //日付クリック
    dayClick(value) {
        //受付中か
        if (this.state.receptionDate <= value) {
            const dayslist = this.state.month_days;
            const clickday = value.getFullYear() + ("0" + (value.getMonth() + 1)).slice(-2) + ("0" + value.getDate()).slice(-2);
            this.setState({ clickdate: clickday })
            //空or重複判定
            if (null == dayslist[clickday] || "" === dayslist[clickday].text) {
                //stampが記号か日付で分岐
                if (this.state.stamp === "time") {
                    this.openModal();

                } else {
                    dayslist[clickday] = { text: this.state.stamp }
                    this.setState({ month_days: dayslist })
                }
                //stamp一致クリック
            } else if (this.state.stamp === dayslist[clickday].text) {
                dayslist[clickday] = { text: "" }
                this.setState({ month_days: dayslist })
            } else if (this.state.stamp !== dayslist[clickday].text) {
                //stampが記号か日付で分岐
                if (this.state.stamp === "time") {
                    //this.openModal();
                    dayslist[clickday] = { text: "" }
                } else {
                    dayslist[clickday] = { text: this.state.stamp }
                    this.setState({ month_days: dayslist })
                }
            }
        }
    }
    commentOnchange(e) {
        this.setState({
            comment: e.target.value
        });
    }

    //モーダル関連
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    afterOpenModal() {
        //モーダルオープン後処理
    }
    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    setShiftTime() {
        if (this.state.startTime >= this.state.endTime) {
            alert("不可能な時間です")
        } else {
            this.closeModal();
            const dayslist = this.state.month_days;
            dayslist[this.state.clickdate] = { text: this.state.startTime + "-" + this.state.endTime }
            this.setState({ month_days: dayslist });
        }
    }
    startTimeChange(e) {
        this.setState({
            startTime: e.target.value
        })
    }
    endTimeChange(e) {
        this.setState({
            endTime: e.target.value
        })
    }
    //登録ボタン
    addDataOnClick() {
        const defshift = this.state.default_month_days;
        const newshift = this.state.month_days;
        const newshiftdata = [];
        //追加されたシフト情報
        for (let shiftday in newshift) {
            if (defshift[shiftday] == null) {
                newshiftdata[shiftday] = { text: newshift[shiftday].text }
            }
        }
        //削除されたシフト情報
        const deleteshiftdata = [];
        for (let shiftday in defshift) {
            if (newshift[shiftday].text === "") {
                deleteshiftdata[shiftday] = { text: defshift[shiftday].text }
            }
        }
        //更新されたシフト情報
        const updateshiftdata = [];
        for (let shiftday in newshift) {
            if (defshift[shiftday] != null && newshift[shiftday].text !== "" && defshift[shiftday].text !== newshift[shiftday].text) {
                updateshiftdata[shiftday] = { text: newshift[shiftday].text }
            }
        }
        //add
        if (newshiftdata.length > 0) {
            this.setState({ isUpdateshift: this.state.isUpdateshift.concat("add") });
            this.dbUpdater('/addshiftdata', newshiftdata);
        }
        //delete
        if (deleteshiftdata.length > 0) {
            this.setState({ isUpdateshift: this.state.isUpdateshift.concat("delete") });
            this.dbUpdater('/deleteshiftdata', deleteshiftdata);
        }
        //update
        if (updateshiftdata.length > 0) {
            this.setState({ isUpdateshift: this.state.isUpdateshift.concat("update") });
            this.dbUpdater('/updateshiftdata', updateshiftdata);
        }
        //コメント更新
        fetch('/updatecommentdata', {
            method: 'POST',
            body: JSON.stringify([this.state.comment]),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(res => res.json())
            .then(str => alert("登録しました"))
        this.shiftupdateChecker("");
    }

    //shiftDB更新用fetch
    dbUpdater(url, data) {
        let postdata = [];
        for (let shift in data) {
            postdata.push({ date: shift, text: data[shift].text })
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(postdata),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(res => res.json())
            .then(str => this.shiftupdateChecker(str))
    }
    shiftupdateChecker(str) {
        if (str !== "") {
            const list = [];
            for (let data of this.state.isUpdateshift) {
                if (data !== str) {
                    list.push(data);
                }
            }
            if (list.length <= 0) {
                //シフトデータ取得
                fetch('/shiftdata')
                    .then(res => res.json())
                    .then(data => this.setdefaultshifts(data))
            }
            this.setState({ isUpdateshift: list });
        } else {
            if (this.state.isUpdateshift.length <= 0) {
                //シフトデータ取得
                fetch('/shiftdata')
                    .then(res => res.json())
                    .then(data => this.setdefaultshifts(data))
            }
        }
    }
}

export default Home;