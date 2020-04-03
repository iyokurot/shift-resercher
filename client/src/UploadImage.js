import React, { useState, useEffect } from 'react'
import { UserContext } from './components/User'
import Dropzone from 'react-dropzone'
import './css/UploadImage.css'

export default function UploadImage(props) {
  const { state, dispatch } = React.useContext(UserContext)
  const [consoleText, setConsoleText] = useState('')
  const [addImage, setAddImage] = useState('')
  const [nowSelect, setNowSelect] = useState(true)
  //const testdefaultUrl = 'http://localhost:5000/imagepath/wakana.jpg'
  const testrouter = ''
  useEffect(() => {
    const firstLoading = user => {
      //
      //console.log(user)
    }
    if (state.user.userId !== '') {
      firstLoading(state.user)
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
          firstLoading(data)
        })
    }
  }, [state.user])

  //uploadエリア
  const handleOnDrop = files => {
    Promise.all(files.map((file, index) => uploadImage(file, index)))
      .then(images => {
        console.log(images)
        //一枚目だけ採用
        /*
        this.setState({
          isUploading: false,
          images: this.state.images.concat(images),
          file2ndname: this.state.file2ndname.concat(images[0].file.name),
        })
        */
      })
      .catch(e => console.log(e))
  }
  //upload POST
  const uploadImage = (file, index) => {
    //一枚目だけ採用
    if (0 !== index) {
      return
    }
    //post
    const imagedata = new FormData()
    imagedata.append('imagedata', file)
    fetch('/image/uploadImage', {
      method: 'POST',
      mode: 'cors',
      body: imagedata,

      mode: 'cors',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setAddImage(res)
      })

    const name = file.name
    return {
      name,
    }
  }

  //画像選択
  const OnSelectImage = bool => {
    setNowSelect(bool)
  }

  //設定ボタン
  const OnClickSetImage = () => {
    if (nowSelect) {
      //元画像
      //新規画像がある場合削除
      if ('' !== addImage) {
        //削除POST
        fetch('/image/deleteNewImage', {
          method: 'POST',
          body: JSON.stringify({ name: addImage.filename }),
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        })
          .then(res => res.json())
          .then(res => {
            if ('clear' === res) {
              setAddImage('')
            } else {
              setConsoleText('エラーが発生しました')
            }
          })
      }
    } else {
      //新規選択
      //null or new
      if ('' === addImage) {
        //null
        if ('' !== state.user.imagepath) {
          //defが存在
          //post
          //const paths = testdefaultUrl.split('/')
          const paths = state.user.imagepath.split('/')
          const filename = paths[paths.length - 1]
          fetch('/image/deleteDefaultImage', {
            method: 'POST',
            body: JSON.stringify({ name: filename }),
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          })
            .then(res => res.json())
            .then(res => {
              if ('clear' === res) {
                const user = state.user
                user.imagepath = ''
                dispatch({
                  type: 'set-user',
                  payload: {
                    user: user,
                  },
                })
              } else {
                setConsoleText('エラーが発生しました')
              }
            })
        }
      } else {
        //new
        if ('' !== state.user.imagepath) {
          //元画像あり
          //元画像削除＆DB更新
          const paths = state.user.imagepath.split('/')
          const filename = paths[paths.length - 1]
          fetch('/image/deleteDefaultImageToNew', {
            method: 'POST',
            body: JSON.stringify({ name: filename, newpath: addImage.path }),
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          })
            .then(res => res.json())
            .then(res => {
              if ('clear' === res) {
                const user = state.user
                user.imagepath = addImage.path
                dispatch({
                  type: 'set-user',
                  payload: {
                    user: user,
                  },
                })
                setAddImage('')
                setNowSelect(true)
              } else {
                setConsoleText('エラーが発生しました')
              }
            })
        } else {
          //元画像なし
          //DB更新
          const paths = addImage.path.split('/')
          const filename = paths[paths.length - 1]
          fetch('/image/setNewImage', {
            method: 'POST',
            body: JSON.stringify({ name: filename, newpath: addImage.path }),
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          })
            .then(res => res.json())
            .then(res => {
              if ('clear' === res) {
                const user = state.user
                user.imagepath = addImage.path
                dispatch({
                  type: 'set-user',
                  payload: {
                    user: user,
                  },
                })
                setAddImage('')
                setNowSelect(true)
              } else {
                setConsoleText('エラーが発生しました')
              }
            })
        }
        console.log('new')
      }
    }
  }

  return (
    <div
      className="background"
      style={
        nowSelect
          ? {
              backgroundImage: `url(${state.user.imagepath})`,
            }
          : {
              backgroundImage: `url(${addImage.path})`,
            }
      }
    >
      <h1>UploadImage</h1>
      {state.user.userId !== '' ? (
        <div>
          <h2>collect</h2>
          <p>{consoleText}</p>
          <div style={{ width: 300, margin: '20px auto' }}>
            <Dropzone onDrop={handleOnDrop} accept="image/*">
              {({ getRootProps, getInputProps }) => (
                <div id="drop" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div>アップロード</div>
                </div>
              )}
            </Dropzone>
            <p>test</p>
          </div>
          <div id="background-sample-two">
            <div
              className="background-sample-flame"
              id={nowSelect ? 'background-sample-select' : ''}
              onClick={() => OnSelectImage(true)}
            >
              {'' === state.user.imagepath ? (
                <p>背景画像が設定されていません</p>
              ) : (
                <img
                  src={state.user.imagepath}
                  className="background-sample"
                  alt="元の背景画像"
                />
              )}
            </div>
            {addImage === '' ? (
              <div
                className="background-sample-flame"
                id={!nowSelect ? 'background-sample-select' : ''}
                onClick={() => OnSelectImage(false)}
              >
                アップロード画像がありません
              </div>
            ) : (
              <div
                className="background-sample-flame"
                id={!nowSelect ? 'background-sample-select' : ''}
                onClick={() => OnSelectImage(false)}
              >
                <img
                  src={addImage.path}
                  className="background-sample"
                  alt="新背景画像"
                />
              </div>
            )}
          </div>
          <p>画像タップで背景を試すことができます</p>
          <button className="bluebutton" onClick={OnClickSetImage}>
            設定する
          </button>
        </div>
      ) : (
        <div>LoadingNow</div>
      )}
    </div>
  )
}
