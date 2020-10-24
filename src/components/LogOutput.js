import React, {useEffect, useMemo, useState} from 'react'
import {Col, FormGroup, Input, Row} from 'reactstrap'
import config from '../config'
import socketio from 'socket.io-client'
import shortkeyHandler from '../helpers/shortkeyHandler'

const socket = socketio(`http://${config.host}:4002`)

const useSocketIOTopic = (topic) => {
  const [response, setResponse] = useState(undefined)

  useEffect(() => {
    socket.on(topic, (data) => {
      setResponse(data)
    })
  }, [topic])

  return response
}

const SerialOutput = ({connection}) => {
  const [text, setText] = useState(``)
  const [level, setLevel] = useState('all')
  const [topic, setTopic] = useState('')
  const [autoClear] = useState(false)
  const res = useSocketIOTopic('log')
  useEffect(() => {
    shortkeyHandler.addEvent('clearLogText', {metaKey: true, shiftKey: true, key: 'k'}, () => setText(``))
  }, [])
  useMemo(() => {
    if (res) {
      const {data, meta} = res
      if (level !== 'all' && meta.level !== level)
        return

      if (topic !== '' && meta.topic !== topic)
        return

      if (autoClear) {
        return setText(`${data}\r\n`)
      }
      setText(`${text}${data}\r\n`)
    }
    // eslint-disable-next-line
  }, [res, autoClear])

  return (

    <div className="w-100">
      <div className="textarea-container">
        <Input type="textarea" disabled={!connection} value={text} style={{height: '45vh', lineHeight: 1.2}}/>
        <div className="corner-button">
          <Input type="select"
                 className="form-control" value={level}
                 onChange={({target}) => {
                   setLevel(target.value)
                   setText('')
                 }}
          >
            <option value="all">All</option>
            <option value="fatal">Fatal</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
            <option value="trace">Trace</option>
          </Input>
          <Input type="text" className="form-control" value={topic} onChange={({target}) => {
            setText('')
            setTopic(target.value)
          }}/>
        </div>
      </div>

    </div>

  )
}

export default SerialOutput
