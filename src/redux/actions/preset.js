import {DELETE_PRESET, SET_PRESET} from '../actionTypes'
import axios from 'axios'
import config from '../../config'

export const addPreset = ({header, data}) => (dispatch) => {
  axios.post(`http://${config.host}:4002/saves`, {header, data})
    .catch(() => [])
    .then(() => dispatch(fetchPreset()))

  dispatch(fetchPreset())
}

export const deletePreset = (id) => async (dispatch) => {
  await axios.post(`http://${config.host}:4002/saves/deletes`, {id})
    .catch(() => [])

  dispatch(fetchPreset())
  dispatch({
    type: DELETE_PRESET,
    payload: {}
  })
}

export const fetchPreset = () => async (dispatch) => {
  const results = await axios.get(`http://${config.host}:4002/saves`)
    .catch(() => [])
    .then(({data}) => data.map(({id, header, data}) => ({id, header, data})))

  dispatch({
    type: SET_PRESET,
    payload: results,
  })
}
