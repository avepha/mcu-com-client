import {SET_CONNECTION} from '../actionTypes'

const initState = {
  connection: false
}

export default function (state = initState, action) {
  switch (action.type) {
    case SET_CONNECTION: {
      return {...state, connection: action.payload}
    }
    default: {
      return state
    }
  }
}
