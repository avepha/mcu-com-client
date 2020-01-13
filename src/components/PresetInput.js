import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Button, Col, FormGroup, Input, Label} from 'reactstrap'
import config from '../config'

const PRESETS = [
  {
    header: 'info',
    data: {
      topic: 'info',
      method: 'query',
      reqId: 'req-1',
    }
  }
]

const PresetInput = ({onSelect}) => {
  const [presets, setPreset] = useState(PRESETS)

  useEffect(() => {
    axios.get(`http://${config.host}:4002/saves`).then(({data}) => {
      const nPresets = data.map(({header, data}) => ({header, data}))
      setPreset([...presets, ...nPresets])
    })
    // eslint-disable-next-line
  }, [])

  return (
    <FormGroup row>
      <Label xs={1}>Preset: </Label>
      <Col xs={7}>
        <Input type="select" onChange={({target}) => onSelect(presets[target.value])}>
          {presets.map(({header, data}, index) => <option key={index} value={index}>{header}</option>)}
        </Input>
      </Col>
      <Col xs={2}>
        <Button type="button" color="primary" className="form-control" onClick={() => null}>Edit</Button>
      </Col>
      <Col xs={2}>
        <Button type="button" color="success" className="form-control" onClick={() => null}>+ Add</Button>
      </Col>
    </FormGroup>
  )
}

export default PresetInput
