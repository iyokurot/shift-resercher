import React, { useState, useEffect } from 'react'
import { UserContext } from './components/User'
import './css/CountGame.css'

export default function CountGame(porps) {
  const { state, dispatch } = React.useContext(UserContext)
  const [level, setLevel] = useState(0) //0初級、1中級、2上級
  const leveltext = ['気まぐれ', '悪あがき', 'つよつよ']
  const [selectLevel, setSelectLevel] = useState(false)
  const [startgame, setStartgame] = useState(false)
  const [userturn, setUserturn] = useState(false)
  const [num, setNum] = useState(0)
  const [count, setCount] = useState(0)
  const [endGame, setEndGame] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const testrouter = ''
  useEffect(() => {
    //
    if (state.user.userId !== '') {
      //
    } else {
      //state無しfetch
      fetch(testrouter + '/userdata')
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: 'set-user',
            payload: {
              user: data,
            },
          })
        })
    }
  }, [state.user])
  const levelselected = lv => {
    setLevel(lv)
    setSelectLevel(true)
  }
  const backTop = () => {
    setSelectLevel(false)
  }
  const setTurn = turn => {
    if ('t' === turn) {
      //先攻
      setUserturn(true)
    } else if ('f' === turn) {
      //後攻
      computerTurn(0)
    }
    setStartgame(true)
  }
  const countPlus = () => {
    if (!endGame && userturn) {
      //ターンである
      if (3 > count) {
        //3カウント以内
        const nextNum = num + 1
        setNum(nextNum)
        if (nextNum >= 20) {
          gameEnd(false)
          return
        }
        if (count === 2) {
          //ターン切り替え
          setCount(3)
          computerTurn(nextNum)
        } else {
          setCount(count + 1)
        }
      } else {
        computerTurn(num)
      }
    }
  }
  const turnEnd = () => {
    if (!endGame && userturn) {
      if (0 >= count) {
        return
      } else {
        //ターン切り替え
        computerTurn(num)
      }
    }
  }
  const resetGame = () => {
    setStartgame(false)
    setNum(0)
    setEndGame(false)
    setCount(0)
  }

  const computerTurn = async endNum => {
    setUserturn(false)
    //初級
    if (0 == level) {
      const cpCount = Math.floor(Math.random() * 3) + 1
      for (let i = 0; i < cpCount; i++) {
        await new Promise(resolve => setTimeout(resolve, 500))
        const nextNum = endNum + i + 1
        setNum(nextNum)
        if (20 <= nextNum) {
          gameEnd(true)
          return
        }
      }
    }
    //中級
    else if (1 == level) {
      //16以上から思考
      let cpCount = 1
      if (endNum >= 16) {
        cpCount = 19 - endNum
        if (cpCount === 0) {
          cpCount = 1
        }
      } else {
        cpCount = Math.floor(Math.random() * 3) + 1
      }
      for (let i = 0; i < cpCount; i++) {
        await new Promise(resolve => setTimeout(resolve, 500))
        const nextNum = endNum + i + 1
        setNum(nextNum)
        if (20 <= nextNum) {
          gameEnd(true)
          return
        }
      }
    }
    //上級
    else if (2 == level) {
      //必勝[3,7,11,15,19]を押さえる
      console.log(endNum)
      let cpCount = 1
      if (endNum < 3) {
        cpCount = 3 - endNum
      } else if (endNum < 7) {
        cpCount = 7 - endNum
        if (cpCount > 3) {
          cpCount = 1
        }
      } else if (endNum < 11) {
        cpCount = 11 - endNum
        if (cpCount > 3) {
          cpCount = 1
        }
      } else if (endNum < 15) {
        cpCount = 15 - endNum
        if (cpCount > 3) {
          cpCount = 1
        }
      } else if (endNum < 19) {
        cpCount = 19 - endNum
        if (cpCount > 3) {
          cpCount = 1
        }
      }

      //回数決定後
      for (let i = 0; i < cpCount; i++) {
        await new Promise(resolve => setTimeout(resolve, 500))
        const nextNum = endNum + i + 1
        setNum(nextNum)
        if (20 <= nextNum) {
          gameEnd(true)
          return
        }
      }
    }
    setCount(0)
    setUserturn(true)
  }
  const gameEnd = win => {
    setEndGame(true)
    setIsWin(win)
  }
  const point1 = () => {
    if (count <= 1) {
      return false
    }
    return false
  }

  return (
    <div id="background">
      <link
        href="https://fonts.googleapis.com/earlyaccess/nicomoji.css"
        rel="stylesheet"
      ></link>
      <h1>CountGame</h1>
      {selectLevel ? (
        <span>
          {startgame ? (
            <div>
              {endGame ? (
                <div>
                  {isWin ? (
                    <div>
                      <h2 id="win-color">勝ち！</h2>
                    </div>
                  ) : (
                    <div>
                      <h2 id="lose-color">負け！</h2>
                    </div>
                  )}
                </div>
              ) : (
                ''
              )}
              {userturn ? (
                <div>
                  <span id="count-color">あなた</span>のターン
                </div>
              ) : (
                <div>あいてのターン</div>
              )}
              <h2 id="numText">{num}</h2>
              <span className="countText" id={count >= 1 ? 'count-color' : ''}>
                ●
              </span>
              <span id={count >= 2 ? 'count-color' : ''} className="countText">
                ●
              </span>
              <span id={count >= 3 ? 'count-color' : ''} className="countText">
                ●
              </span>
              <div>
                <button className="plusbutton" onClick={countPlus}>
                  数える
                </button>
                <button className="negresivebutton" onClick={turnEnd}>
                  ターン終了
                </button>
              </div>
              <button className="agresivebutton" onClick={resetGame}>
                やり直し
              </button>
            </div>
          ) : (
            <div>
              <h2>{leveltext[level]}</h2>
              <button
                className="agresivebutton"
                value="t"
                onClick={e => setTurn(e.target.value)}
              >
                せんこう
              </button>
              <button
                className="negresivebutton"
                value="f"
                onClick={e => setTurn(e.target.value)}
              >
                こうこう
              </button>
              <div>
                <button className="plusbutton" onClick={backTop}>
                  もどる
                </button>
              </div>
            </div>
          )}
        </span>
      ) : (
        <div>
          <h2 className="gametitle">カウントゲーム</h2>
          <div id="explain-fadein">
            <h2>
              20を言った方が<span id="lose-color">負け！</span>
            </h2>
            <p>相手に20を先に言わせよう</p>
            <p>一度に数えられるのは3まで！</p>
          </div>
          <div id="explain-fadein-second">
            <h2>難易度</h2>
            <div className="game-portrait">
              <button
                value="0"
                onClick={e => levelselected(e.target.value)}
                className="game-levelbutton"
              >
                気まぐれ
              </button>
              <button
                value="1"
                onClick={e => levelselected(e.target.value)}
                className="game-levelbutton"
              >
                悪あがき
              </button>
              <button
                value="2"
                onClick={e => levelselected(e.target.value)}
                className="game-levelbutton"
              >
                つよつよ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
