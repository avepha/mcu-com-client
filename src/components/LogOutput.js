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
        return setText('')

      if (topic !== '' && meta.topic !== topic)
        return setText('')

      if (autoClear) {
        return setText(`${data}\r\n`)
      }
      setText(`${text}${data}\r\n`)
    }
    // eslint-disable-next-line
  }, [res, autoClear])

  return (
    <FormGroup className="m-0 p-0">
      <Row form>
        <Col md={3} className="m-0 p-0 ml-1">
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
        </Col>
        <Col md={8} className="m-0 p-0">
          <Input type="text" className="form-control" value={topic} onChange={({target}) => {
            setText('')
            setTopic(target.value)
          }}/>
        </Col>
      </Row>
      <Input type="textarea" disabled={!connection} value={text} style={{height: '40vh', lineHeight: 1.2}}/>
    </FormGroup>
  )
}

export default SerialOutput
