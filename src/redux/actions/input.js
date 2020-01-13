import {SET_SERIAL_INPUT_TEXT} from '../actionTypes'

export const setSerialInputText = ({inputText}) => ({
  type: SET_SERIAL_INPUT_TEXT,
  payload: {
    inputText
  }
})
