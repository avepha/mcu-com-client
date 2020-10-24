import axios from 'axios'
import {connect} from 'react-redux'
import {Button, Col, Form, FormGroup, Input, Label} from 'reactstrap'
import React, {useEffect, useState} from 'react'
import useForm from 'react-hook-form'
import config from '../config'
import shortkeyHandler from '../helpers/shortkeyHandler'
import {setConnection} from '../redux/actions'

const baudRates = [
  345600,
  115200,
  56700,
  19200,
  9600,
]

const SelectPortInput = ({connection, setConnection}) => {
  const [ports, setPorts] = useState([])
  const [port, setPort] = useState()
  const [baudRate, setBaudRate] = useState()
  const {register, getValues} = useForm()

  const onConnect = async () => {
    try {
      const {port, baudRate} = getValues()
      await axios.post(`http://${config.host}:4002/connect`, {port, baudRate})
      setConnection(true)
    } catch ({response}) {
      alert(JSON.stringify(response.data))
    }
  }

  const onDisconnect = async () => {
    try {
      await axios.post(`http://${config.host}:4002/disconnect`)
      setConnection(false)
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
        setConnection(true)
      }
      else setConnection(false)
    }).catch(e => console.log({e}))

    shortkeyHandler.addEvent('connect', {metaKey: true, shiftKey: true, key: 's'}, () => onConnect())
    shortkeyHandler.addEvent('disconnect', {metaKey: true, shiftKey: true, key: 'x'}, () => onDisconnect())
    // eslint-disable-next-line
  }, [])

  return <Form>
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
        {
          connection
            ? <Button type="button" color="danger" className="form-control" onClick={onDisconnect}>Close</Button>
            : <Button type="button" color="success" className="form-control" onClick={onConnect}>Connect</Button>
        }
      </Col>
    </FormGroup>
  </Form>
}

const mapStateToProps = ({connection}) => {
  return {
    connection: connection.connection
  }
}

export default connect(mapStateToProps, {setConnection})(SelectPortInput)
