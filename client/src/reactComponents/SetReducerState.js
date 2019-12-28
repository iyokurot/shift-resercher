import React, { useEffect, useContext } from 'react'
import { UserContext } from '../components/User'

export default function SetReducerState(props) {
  const { state, dispatch } = useContext(UserContext)
  const number = 0

  useEffect(() => {
    if (props.userdata.length !== 0 && props.userdata.userId !== '') {
      if (
        state.user.userId === '' ||
        state.user.userId !== props.userdata.userId
      ) {
        dispatch({
          type: 'set-user',
          payload: {
            user: props.userdata,
          },
        })
      }
    }
  }, [number])
  return <span></span>
}
