import {ADD_RECENT, DELETE_RECENT} from '../actionTypes'

export const addRecent = ({data}) => ({
  type: ADD_RECENT,
  payload: {data}
})

export const delRecentAll = () => ({
  type: DELETE_RECENT,
  payload: {}
})
