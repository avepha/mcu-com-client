import React, {Fragment, useEffect, useState, useMemo} from 'react'
import {Input, Label, Button, FormGroup} from 'reactstrap'
import syntaxHighlight from '../helpers/syntaxHighlight'
import socketio from 'socket.io-client'
const socket = socketio('http://localhost:4002')


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
  const res = useSocketIOTopic('listening')

  useMemo(() => {
    if (res) {
      const {type, data} = res
      if (type === 'json') {
        const mergeText = `${text}${JSON.stringify(data, null, 2)}\r\n`
        setText(mergeText)
      }
      else {
        const mergeText = `${text}${data}\r\n`
        setText(mergeText)
      }
    }
  }, [res])

  return (
    <Fragment>
      <FormGroup>
        <Label>Output</Label>
        <Input type="textarea" disabled={!connection} value={text} style={{height: '85vh', lineHeight: 1.2}}/>
      </FormGroup>
      <div className="w-100 text-right">
        <Button type="button" color="primary" onClick={() => setText(``)}>Clear</Button>
      </div>
    </Fragment>
  )
}

export default SerialOutput
