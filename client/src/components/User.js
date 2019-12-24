import React from 'react'
import reducer from '../reducers/reducer'

const UserContext = React.createContext()
const initialState = {
  user: {
    userId: '',
    displayName: '',
    picture: '',
    username: '',
    worktime: '',
    administer: false,
    regist: false,
  },
}

function UserContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  )
}
const UserContextConsumer = UserContext.Consumer

export { initialState, UserContext, UserContextProvider, UserContextConsumer }
