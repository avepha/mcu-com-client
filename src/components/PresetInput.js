import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {setSerialInputText} from '../redux/actions'
import {Button, Col, FormGroup, Input, Label} from 'reactstrap'

import {fetchPreset} from '../redux/actions'

import AddPresetModal from './AddPresetModal'
import EditPresetModal from './EditPresetModal'

const PresetInput = ({setSerialInputText, presets, fetchPreset}) => {
  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  useEffect(() => {
    fetchPreset()
    // eslint-disable-next-line
  }, [])

  return (
    <FormGroup row>
      <AddPresetModal close={() => setModal(false)} open={modal} />
      <EditPresetModal close={() => setEditModal(false)} open={editModal} />
      <Label xs={1}>Preset: </Label>
      <Col xs={7}>
        <Input type="select" onChange={({target}) => target.value !== -1 && setSerialInputText({inputText: presets[target.value].data})}>
          {presets.map(({header, data}, index) => <option key={index} value={index}>{header}</option>)}
        </Input>
      </Col>
      <Col xs={2}>
        <Button type="button" color="primary" className="form-control" onClick={() => setEditModal(true)}>Edit</Button>
      </Col>
      <Col xs={2}>
        <Button type="button" color="success" className="form-control" onClick={() => setModal(true)}>+ Add</Button>
      </Col>
    </FormGroup>
  )
}

const mapStateToProps = ({preset}) => {
  const {presets} = preset
  return {presets}
}
export default connect(mapStateToProps, {setSerialInputText, fetchPreset})(PresetInput)
