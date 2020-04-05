import React, { useState, useEffect } from 'react'
import { UserContext } from './components/User'
import Dropzone from 'react-dropzone'
import './css/UploadImage.css'
import LoadingComponent from './reactComponents/loading'

export default function UploadImage(props) {
  const { state, dispatch } = React.useContext(UserContext)
  const [consoleText, setConsoleText] = useState('')
  const [nowUploading, setNowUploading] = useState(false)
  const [addImage, setAddImage] = useState('')
  const [nowSelect, setNowSelect] = useState(true)
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
    setNowUploading(true)
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
    //連続アップロードhandling
    if ('' !== addImage) {
      //既存削除fetch
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
            //setAddImage('')
          } else {
            setConsoleText('エラーが発生しました')
          }
        })
    }
    //post
    const imagedata = new FormData()
    imagedata.append('imagedata', file)
    fetch('/image/uploadImage', {
      method: 'POST',
      body: imagedata,

      mode: 'cors',
    })
      .then(res => res.json())
      .then(res => {
        //console.log(res)
        setAddImage(res)
        setNowUploading(false)
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
          fetch('/image/deleteDefaultImage', {
            method: 'POST',
            body: JSON.stringify({ path: state.user.imagepath }),
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

          fetch('/image/deleteDefaultImageToNew', {
            method: 'POST',
            body: JSON.stringify({
              path: state.user.imagepath,
              newpath: addImage.path,
            }),
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
          console.log(addImage.path)
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
        //console.log('new')
      }
    }
  }

  //背景削除
  const OnClickSetDefaultImage = () => {
    if ('' !== state.user.imagepath) {
      //defが存在
      //post
      fetch('/image/deleteDefaultImage', {
        method: 'POST',
        body: JSON.stringify({
          path: state.user.imagepath,
        }),
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
          <p>{consoleText}</p>
          <div id="upload-area">
            {nowUploading ? (
              <div>アップロード中</div>
            ) : (
              <Dropzone onDrop={handleOnDrop} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                  <div id="drop" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div>背景に設定したい画像を</div>
                    <div>タップ＆アップロード</div>
                  </div>
                )}
              </Dropzone>
            )}
          </div>
          <div id="background-sample-two">
            <div
              className="background-sample-flame"
              id={nowSelect ? 'background-sample-select' : ''}
              onClick={() => OnSelectImage(true)}
            >
              {state.user == '' || '' === state.user.imagepath ? (
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
          <button
            className="bluebutton"
            onClick={OnClickSetImage}
            style={{ width: 100 }}
          >
            設定する
          </button>
          <button
            className="redbutton"
            onClick={OnClickSetDefaultImage}
            style={{ width: 100 }}
          >
            背景なし
          </button>
        </div>
      ) : (
        <LoadingComponent />
      )}
    </div>
  )
}
