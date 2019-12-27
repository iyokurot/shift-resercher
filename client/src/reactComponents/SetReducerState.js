import React, { useEffect, useContext } from 'react'
import { UserContext } from '../components/User'

export default function SetReducerState(props) {
  const { state, dispatch } = useContext(UserContext)

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
  }, [props.userdata])
  return <span></span>
}
