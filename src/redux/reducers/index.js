import {combineReducers} from 'redux'
import recent from './recent'
import input from './input'
import preset from './preset'
import connection from './connection'

export default combineReducers({recent, input, preset, connection})
