import {SET_SERIAL_INPUT_TEXT} from '../actionTypes'

const initState = {
  serialInputText: 'test'
}

export default function(state = initState, action) {
  switch (action.type) {
    case SET_SERIAL_INPUT_TEXT: {
      const {inputText} = action.payload
      return {...state, serialInputText: inputText}
    }
    default: {
      return state
    }
  }
}
