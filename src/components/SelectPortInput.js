import axios from 'axios'
import React, {useEffect, useMemo, useState} from 'react'
import useForm from 'react-hook-form'
import {Button, Col, Form, FormGroup, Input, Label} from 'reactstrap'
import config from '../config'
import shortkeyHandler from '../helpers/shortkeyHandler'
const baudRates = [
  115200,
  345600,
  56700,
  19200,
  9600,
]

const SelectPortInput = ({onStatusChange = () => true}) => {
  const [ports, setPorts] = useState([])
  const [connected, setConnected] = useState(false)
  const [port, setPort] = useState()
  const [baudRate, setBaudRate] = useState()
  const {register, getValues} = useForm()

  const onConnect = async () => {
    try {
      const {port, baudRate} = getValues()
      await axios.post(`http://${config.host}:4002/connect`, {port, baudRate})
      setConnected(true)
    } catch ({response}) {
      alert(JSON.stringify(response.data))
    }
  }

  const onDisconnect = async () => {
    try {
      await axios.post(`http://${config.host}:4002/disconnect`)
      setConnected(false)
    } catch ({response}) {
      alert(JSON.stringify(response.data))
    }
  }

  useEffect(() => {
    axios.get(`http://${config.host}:4002/list`).then(({data}) => setPorts(data))
    axios.get(`http://${config.host}:4002/info`).then(({data}) => {
      if (data.status === 'connected') {
        const {port: _port, baudRate: _baudRate} = data.data
        setPort(_port)
        setBaudRate(_baudRate)
        setConnected(true)
      } else setConnected(false)
    }).catch(e => console.log({e}))

    shortkeyHandler.addEvent('connect', {metaKey: true, shiftKey: true, key: 's'}, () => onConnect())
    shortkeyHandler.addEvent('disconnect', {metaKey: true, shiftKey: true, key: 'x'}, () => onDisconnect())
    // eslint-disable-next-line
  }, [])


  useMemo(() => {
    onStatusChange(connected)
  }, [connected, onStatusChange])

  return <Form className="mt-2">
    <FormGroup row>
      <Label sm={1}>
        <span className="font-weight-bolder">Port: </span>
      </Label>
      <Col sm={7}>
        <Input type="select" name="port" value={port} innerRef={register({required: true})}>
          <option value={'/dev/ROBOT'} key={'robot'}>/dev/ROBOT</option>
          {
            ports.map(port => <option value={port} key={port}>{port}</option>)
          }
        </Input>
      </Col>
      <Col sm={2}>
        <Input type="select" name="baudRate" value={baudRate} innerRef={register({required: true})}>
          {baudRates.map(baudRate => <option key={baudRate} value={baudRate}>{baudRate}</option>)}
        </Input>
      </Col>
      <Col sm={2}>
        {!connected && <Button type="button" color="success" className="form-control" onClick={onConnect}>Connect</Button>}
        {connected && <Button type="button" color="danger" className="form-control" onClick={onDisconnect}>Disconnected</Button>}
      </Col>
    </FormGroup>
  </Form>
}

export default SelectPortInput
