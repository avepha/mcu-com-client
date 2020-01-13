import React, {Fragment, useEffect, useMemo, useState} from 'react'
import {Button, FormGroup, Input, Label} from 'reactstrap'
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
  const [autoClear, setAutoClear] = useState(false)
  const res = useSocketIOTopic('listening')
  useEffect(() => {
    shortkeyHandler.addEvent('clearText', {metaKey: true, shiftKey: true, key: 'k'}, () => setText(``))
  }, [])
  useMemo(() => {
    if (res) {
      const {type, data} = res
      if (type === 'json') {
        if (autoClear) {
          return setText(`${JSON.stringify(data, null, 2)}\r\n`)
        }

        setText(`${text}${JSON.stringify(data, null, 2)}\r\n`)
      } else {
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

      <FormGroup>
        <Label>
          Output
        </Label>
        <Input type="textarea" disabled={!connection} value={text} style={{height: '85vh', lineHeight: 1.2}}/>
      </FormGroup>
      <div className="w-100 text-right">
        <Label check>
          <Input type="checkbox" checked={autoClear} onChange={({target}) => setAutoClear(target.checked)}/>{' '}
          Auto-Clear
        </Label>
        <Button type="button" color="primary" className="ml-3" onClick={() => setText(``)}>Clear</Button>
      </div>
    </Fragment>
  )
}

export default SerialOutput
