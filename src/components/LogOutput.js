import React, {Fragment, useEffect, useMemo, useState} from 'react'
import {FormGroup, Input} from 'reactstrap'
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
  const [autoClear] = useState(false)
  const res = useSocketIOTopic('log')
  useEffect(() => {
    shortkeyHandler.addEvent('clearLogText', {metaKey: true, shiftKey: true, key: 'k'}, () => setText(``))
  }, [])
  useMemo(() => {
    if (res) {
      const {type, data} = res
      if (type === 'json') {
        if (autoClear) {
          return setText(`${JSON.stringify(data, null, 2)}\r\n`)
        }

        setText(`${text}${JSON.stringify(data, null, 2)}\r\n`)
      }
      else {
        if (autoClear) {
          return setText(`${data}\r\n`)
        }
        setText(`${text}${data}\r\n`)
      }
    }
    // eslint-disable-next-line
  }, [res, autoClear])

  return (
    <Fragment>
      <FormGroup className="m-0 p-0">
        <Input type="textarea" disabled={!connection} value={text} style={{height: '40vh', lineHeight: 1.2}}/>
      </FormGroup>
    </Fragment>
  )
}

export default SerialOutput
