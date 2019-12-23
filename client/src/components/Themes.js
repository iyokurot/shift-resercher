import React from 'react'
import reducer from '../reducers/reducer'

const ThemeContext = React.createContext()
const initialState = {
  color: {
    name: 'light',
    text: '#000000',
    back: '#FFFFFF',
  },
}

function ThemeContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = { state, dispatch }

  return (
    // コンテキストプロバイダーとしてuseReducerのstateとdispatchをコンテキストに設定
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  )
}
const ThemeContextConsumer = ThemeContext.Consumer

export {
  initialState,
  ThemeContext,
  ThemeContextProvider,
  ThemeContextConsumer,
}
