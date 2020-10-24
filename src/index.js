import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/css/common.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorker from './serviceWorker'
import store from './redux/store'
import {Provider} from 'react-redux'
import pkg from '../package.json'

ReactDOM.render(
  <Provider store={store}>
    <App/>
    <span className="position-relative" style={{bottom: 0, right: 0}}>
        version: {pkg.version}
      </span>
  </Provider>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
