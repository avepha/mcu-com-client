import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {setSerialInputText} from '../redux/actions'
import {Button, Col, FormGroup, Input, Label} from 'reactstrap'
import config from '../config'

import AddPresetModal from './AddPresetModal'


const PresetInput = ({setSerialInputText}) => {
  const [presets, setPreset] = useState([])
  const [modal, setModal] = useState(true)
  useEffect(() => {
    axios.get(`http://${config.host}:4002/saves`).then(({data}) => {
      const nPresets = data.map(({header, data}) => ({header, data}))
      setPreset([...presets, ...nPresets])

      if (nPresets.length > 0) setSerialInputText({inputText: nPresets[0].data})
    })
    // eslint-disable-next-line
  }, [])

  return (
    <FormGroup row>
      <AddPresetModal close={() => setModal(false)} open={modal} />
      <Label xs={1}>Preset: </Label>
      <Col xs={7}>
        <Input type="select" onChange={({target}) => target.value !== -1 && setSerialInputText({inputText: presets[target.value].data})}>
          {presets.map(({header, data}, index) => <option key={index} value={index}>{header}</option>)}
        </Input>
      </Col>
      <Col xs={2}>
        <Button type="button" color="primary" className="form-control" onClick={() => null}>Edit</Button>
      </Col>
      <Col xs={2}>
        <Button type="button" color="success" className="form-control" onClick={() => setModal(true)}>+ Add</Button>
      </Col>
    </FormGroup>
  )
}

export default connect(null, {setSerialInputText})(PresetInput)
