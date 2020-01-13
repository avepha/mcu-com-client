import {ADD_PRESET, DELETE_PRESET, SET_PRESET} from '../actionTypes'

const initialState = {
  presets: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRESET: {
      return {...state, presets: action.payload || []}
    }
    case ADD_PRESET: {
      return {...state}
    }
    case DELETE_PRESET: {
      return {...state}
    }
    default:
      return state
  }
}
