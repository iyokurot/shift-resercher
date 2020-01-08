import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { GetNewDateByNum, GetFormatDate } from './DateHandler'
import {
  receptionText,
  getPreReceptionDate,
  getBackReceptionDate,
} from './components/ReceptionDate'
const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#5f28c4',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#5f28c4',
      },
    },
  },
})(TextField)

const HomeComment = props => {
  const [wishday, setWishday] = useState('') //現在の希望日数
  const wishdays = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  const [comment, setComment] = useState('') //現在のコメント
  const [comments, setComments] = useState([]) //コメントリスト
  const [nowprintcommentday, setNowprintcommentday] = useState('') //表示中期間日付
  const [textareaRow, setTextareaRow] = useState(2)
  const testrouter = ''
  useEffect(() => {
    //コメントデータ取得
    fetch(testrouter + '/getcommentdata')
      .then(res => res.json())
      .then(data => setdefaultcomment(data))
  }, [testrouter])

  //commentSetting
  const setdefaultcomment = data => {
    const list = []
    if (data !== '') {
      for (const comment of data) {
        const date = new Date(comment.date)
        const num = GetFormatDate(date)
        list[num] = { comment: comment.text, wishday: comment.wishday }
      }
    }
    //締め切りの初期コメント設定
    const recepdate = props.receptionDate
    const firstdate = GetFormatDate(recepdate)
    let com = ''
    let wish = ''
    if (list[firstdate] != null) {
      com = list[firstdate].comment
      wish = list[firstdate].wishday
    }
    setComments(list)
    setComment(com)
    setWishday(wish)
    setNowprintcommentday(firstdate)
  }
  const dayspreOnclick = () => {
    //あと
    dayspreback('pre')
  }
  const daysbackOnclick = () => {
    //前
    dayspreback('back')
  }
  const dayspreback = str => {
    const printday = nowprintcommentday
    const nowdate = GetNewDateByNum(printday)
    let nextdate = new Date()
    if (str === 'pre') {
      nextdate = getPreReceptionDate(nowdate)
    } else if (str === 'back') {
      nextdate = getBackReceptionDate(nowdate)
    }

    if (comments[GetFormatDate(nextdate)] == null) {
      setComment('')
      setWishday('')
    } else {
      setComment(comments[GetFormatDate(nextdate)].comment)
      setWishday(comments[GetFormatDate(nextdate)].wishday)
    }
    setNowprintcommentday(GetFormatDate(nextdate))
  }
  const onChangeComment = value => {
    setComment(value)
    //行数＋
    if (value.length / 15 > textareaRow - 1) {
      setTextareaRow(textareaRow + 1)
      //桁数--
    } else if (textareaRow > 2 && value.length / 15 + 2 <= textareaRow) {
      setTextareaRow(textareaRow - 1)
    }
  }
  const registComment = () => {
    //addもしくはupdate
    if (comments[nowprintcommentday] == null) {
      //add
      comments[nowprintcommentday] = { comment: comment, wishday: '' }
      dbRegister('/addcommentdata', nowprintcommentday, comment, '')
      //追加DB
    } else if (comment !== comments[nowprintcommentday]) {
      //update
      comments[nowprintcommentday].comment = comment
      dbRegister(
        '/updatecommentdata',
        nowprintcommentday,
        comment,
        comments[nowprintcommentday].wishday,
      )
    }
    setComments(comments)
  }
  const registWishday = day => {
    setWishday(day)
    //追加
    if (comments[nowprintcommentday] == null) {
      comments[nowprintcommentday] = { comment: '', wishday: day }
      dbRegister('/addcommentdata', nowprintcommentday, '', day)
      //更新
    } else if (day !== comments[nowprintcommentday].wishday) {
      comments[nowprintcommentday].wishday = day
      dbRegister(
        '/updatecommentdata',
        nowprintcommentday,
        comments[nowprintcommentday].comment,
        day,
      )
    }
    setComments(comments)
  }
  //dbHandler関数
  const dbRegister = (path, date, comment, wishday) => {
    fetch(testrouter + path, {
      method: 'POST',
      body: JSON.stringify([
        { date: date, comment: comment, wishday: wishday },
      ]),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    }).then(res => res.json())
  }
  return (
    <div className="flameholder">
      <div className="flame">
        補足希望:{receptionText(GetNewDateByNum(nowprintcommentday))}
        <span id="termbuttons">
          <button onClick={dayspreOnclick} className="bluebutton">
            ◁
          </button>
          <button onClick={daysbackOnclick} className="bluebutton">
            ▷
          </button>
        </span>
        <br />
        <div id="wishday">
          希望出勤日数：
          <select onChange={e => registWishday(e.target.value)} value={wishday}>
            {wishdays.map(days => (
              <option key={days}>{days}</option>
            ))}
          </select>
          日
        </div>
        <div>
          <div id="commentareadiv">
            <span id="textareatitle">追記</span>
            <textarea
              id="testarea"
              rows={textareaRow}
              cols="30"
              value={comment}
              placeholder="希望を記入"
              onChange={e => onChangeComment(e.target.value)}
              onBlur={() => registComment()}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}
/*<CssTextField
            id="outlined-name"
            label="追記"
            value={comment}
            onChange={e => setComment(e.target.value)}
            margin="normal"
            variant="outlined"
            placeholder="希望を記入"
            onBlur={() => registComment()}
          /> */

export default HomeComment
