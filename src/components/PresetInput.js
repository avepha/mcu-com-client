import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Button, Col, FormGroup, Input, Label} from 'reactstrap'
import config from '../config'


const PresetInput = ({onSelect}) => {
  const [presets, setPreset] = useState([])

  useEffect(() => {
    axios.get(`http://${config.host}:4002/saves`).then(({data}) => {
      const nPresets = data.map(({header, data}) => ({header, data}))
      setPreset([...presets, ...nPresets])

      if (nPresets.length > 0) onSelect(nPresets[0])
    })
    // eslint-disable-next-line
  }, [])

  return (
    <FormGroup row>
      <Label xs={1}>Preset: </Label>
      <Col xs={7}>
        <Input type="select" onChange={({target}) => target.value !== -1 && onSelect(presets[target.value])}>
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
