import {ADD_RECENT, DEL_RECENT} from '../actionTypes'

export const addRecent = ({data}) => ({
  type: ADD_RECENT,
  payload: {data}
})

export const delRecentAll = () => ({
  type: DEL_RECENT,
  payload: {}
})
