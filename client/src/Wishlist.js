import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.location.query,
            accessable: false,//アクセス判定
            memberlist: [],//登録メンバー
            allshiftdata: [],//全シフト情報
            printlist: [],//表示するリスト
            deadlineearly: 10,
            deallinelate: 24,
            startdate: "",
            printdays: []//表示する期間
        }

        this.setprintDays = this.setprintDays.bind(this);
        this.sortmembershift = this.sortmembershift.bind(this);
    }
    componentDidMount() {
        //アクセス判定
        if (this.props.location.query !== undefined) {
            if (this.props.location.query.pass === "administer") {
                this.setState({
                    accessable: true
                })
                this.setprintDays();
                //全ユーザー取得
                //fetch('/testmemberlist')
                fetch('/memberlist')
                    .then(res => res.json())
                    .then(list => {
                        this.setState({ memberlist: list })
                        //全シフト情報取得
                        //fetch('/testallshiftdata')
                        fetch('/allshiftdata')
                            .then(res => res.json())
                            .then(data => {
                                this.setState({ allshiftdata: data });
                                this.sortmembershift(list, data);
                            })
                    })

            }
        }
    }
    render() {
        const classes = useStyles;
        return (
            <div>
                {this.state.accessable ? (
                    <div>
                        <h1>Wishlist</h1>
                        アクセス可能
                        <Paper className={classes.root}
                            style={{
                                overflowX: 'scroll'
                            }}>
                            <Table className={classes.table}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>name</TableCell>
                                        {this.state.printdays.map((day) =>
                                            <TableCell key={day}>{day}</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.printlist.map(member =>
                                        <TableRow key={member.name}>
                                            <TableCell component="th" scope="row" key={member.name}>{member.name}</TableCell>
                                            {member.shift.map(shift =>
                                                <TableCell component="th" scope="row">{shift}</TableCell>)}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                ) : (
                        <div>アクセスできません</div>
                    )}
            </div>

        );
    }
    //表示期間計算
    setprintDays() {
        //表示する期間開始日を計算
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        let startdate = "";
        if (day < this.state.deadlineearly) {
            startdate = new Date(year, month, 1);
        } else if (day < this.state.deallinelate) {
            startdate = new Date(year, month, 16);
        } else if (day >= this.state.deallinelate) {
            if (month === 11) {
                startdate = new Date(year + 1, month + 1, 1);
            } else {
                startdate = new Date(year, month + 1, 1);
            }
        }
        //date確認用
        //startdate = new Date(2019, 7, 16);

        //表示する期間配列生成
        const days = [];
        if (startdate.getDate() === 1) {
            for (let i = 0; i < 15; i++) {
                days.push((startdate.getMonth() + 1) + "/" + (startdate.getDate() + i));
            }
        } else if (startdate.getDate() === 16) {
            const findate = new Date(startdate.getFullYear(), startdate.getMonth() + 1, 0);
            for (let i = 0; i < findate.getDate() - startdate.getDate() + 1; i++) {
                days.push((startdate.getMonth() + 1) + "/" + (startdate.getDate() + i));
            }
        }
        this.setState({
            startdate: startdate,
            printdays: days
        });
    }
    //
    sortmembershift(members, shifts) {
        const printdate = this.state.startdate;
        let printfinaldate = "";
        let shiftlist = [];
        if (printdate.getDate() === 1) {
            printfinaldate = new Date(printdate.getFullYear(), printdate.getMonth(), 15)
            shiftlist = Array(15);
        } else if (printdate.getDate() === 16) {
            printfinaldate = new Date(printdate.getFullYear(), printdate.getMonth(), 0);
            shiftlist = Array(printfinaldate.getDate() - 15);
        }
        const membertoshift = [];
        for (const member of members) {
            const myshift = shiftlist.slice();
            myshift.fill("/");
            for (const shift of shifts) {
                if (shift.userid === member.userid) {
                    const sd = String(shift.date);
                    const shiftyear = parseInt(sd.slice(0, 4));
                    const shiftmonth = parseInt(sd.slice(4, 6));
                    const shiftday = parseInt(sd.slice(6));
                    if ((shiftyear === printdate.getFullYear()) &&
                        (shiftmonth === (printdate.getMonth() + 1)) &&
                        (shiftday >= printdate.getDate()) &&
                        (shiftday <= printfinaldate.getDate())) {
                        //表示する情報
                        myshift[shiftday - printdate.getDate()] = shift.detail;
                    }
                }
            }
            membertoshift.push({
                name: member.name,
                shift: myshift
            })
        }
        //
        this.setState({
            printlist: membertoshift
        });
    }
}

export default Wishlist;