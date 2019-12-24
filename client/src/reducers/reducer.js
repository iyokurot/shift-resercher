import { initialState } from '../components/User'

// reducer関数
const reducer = (state, action) => {
  switch (action.type) {
    case 'set-user':
      return { ...state, ...action.payload }
    case 'reset-user':
      return initialState
    default:
      return state
  }
}

export default reducer
