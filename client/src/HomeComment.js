//作り変え済み　未使用

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
  //const [recepdate, setRecepdate] = useState(new Date())
  const [wishday, setWishday] = useState('')
  const wishdays = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  const [comment, setComment] = useState('')
  const [default_comments, setdefaultcomments] = useState([])
  const [comments, setComments] = useState([])
  const [nowprintcommentday, setNowprintcommentday] = useState('')
  const [complementdaysText, setComplementdaysText] = useState('')
  const testrouter = ''
  useEffect(() => {
    //コメントデータ取得
    fetch(testrouter + '/getcommentdata')
      .then(res => res.json())
      .then(data => setdefaultcomment(data))
  }, [])

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
    setdefaultcomments(list.slice())
    setComments(list)
    setComment(com)
    setWishday(wish)
    setNowprintcommentday(firstdate)
    setComplementdaysText(receptionText(recepdate))
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
    const commentlist = comments
    commentlist[nowprintcommentday] = {
      comment: comment,
      wishday: wishday,
    }
    setComments(commentlist)
    const printday = nowprintcommentday
    const nowdate = GetNewDateByNum(printday)
    let nextdate = new Date()
    if (str === 'pre') {
      nextdate = getPreReceptionDate(nowdate)
    } else if (str === 'back') {
      nextdate = getBackReceptionDate(nowdate)
    }

    if (comments[GetFormatDate(nextdate)] == null) {
      const printcomments = comments
      printcomments[GetFormatDate(nextdate)] = {
        comment: '',
        wishday: '',
      }
      setComments(printcomments)
    }
    //setComplementdays(new Date(year, month, day))
    setComplementdaysText(receptionText(nextdate))

    setComment(comments[GetFormatDate(nextdate)].comment)
    setWishday(comments[GetFormatDate(nextdate)].wishday)
    setNowprintcommentday(GetFormatDate(nextdate))
  }
  const addComment = async () => {
    //登録ボタン
    const results = []
    results.push(props.addbutton())
    const newcomments = comments
    newcomments[nowprintcommentday] = {
      comment: comment,
      wishday: wishday,
    }
    //コメント更新
    //差分配列add＆update配列生成のちfetch
    const addcommentdata = []
    for (const com in newcomments) {
      if (default_comments[com] == null) {
        addcommentdata.push({
          date: com,
          comment: newcomments[com].comment,
          wishday: newcomments[com].wishday,
        })
      }
    }
    const updatecommentdata = []
    for (const com in default_comments) {
      if (
        newcomments[com].comment !== default_comments[com].comment ||
        newcomments[com].wishday !== default_comments[com].wishday
      ) {
        updatecommentdata.push({
          date: com,
          comment: newcomments[com].comment,
          wishday: newcomments[com].wishday,
        })
      }
    }

    if (updatecommentdata.length > 0) {
      results.push(
        fetch(testrouter + '/updatecommentdata', {
          method: 'POST',
          body: JSON.stringify(updatecommentdata),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        }).then(res => res.json()),
      )
    }
    if (addcommentdata.length > 0) {
      results.push(
        fetch(testrouter + '/addcommentdata', {
          method: 'POST',
          body: JSON.stringify(addcommentdata),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        }).then(res => res.json()),
      )
    }

    await Promise.all(results)
  }
  return (
    <div className="flameholder">
      <div className="flame">
        補足希望:{complementdaysText}
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
          <select onChange={e => setWishday(e.target.value)} value={wishday}>
            {wishdays.map(days => (
              <option key={days}>{days}</option>
            ))}
          </select>
          日
        </div>
        <div>
          <CssTextField
            id="outlined-name"
            label="追記"
            value={comment}
            onChange={e => setComment(e.target.value)}
            margin="normal"
            variant="outlined"
            placeholder="希望を記入"
            onBlur={() => console.log('out')}
          />
        </div>
      </div>
      <button id="submit_shiftdata" onClick={addComment}>
        登録
      </button>
    </div>
  )
}

export default HomeComment
