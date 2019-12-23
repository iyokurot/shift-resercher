import { initialState } from '../components/Themes'

// reducer関数
const reducer = (state, action) => {
  switch (action.type) {
    case 'change-color':
      return { ...state, ...action.payload }
    case 'reset-color':
      return initialState
    default:
      return state
  }
}

export default reducer
