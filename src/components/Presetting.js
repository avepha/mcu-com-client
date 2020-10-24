import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {fetchPreset, setSerialInputText} from '../redux/actions'
import {Button} from 'reactstrap'

import AddPresetModal from './AddPresetModal'
import EditPresetModal from './EditPresetModal'

const PreSetting = ({fetchPreset}) => {
  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  useEffect(() => {
    fetchPreset()
  }, [])

  return (
    <div>
      <AddPresetModal close={() => setModal(false)} open={modal}/>
      <EditPresetModal close={() => setEditModal(false)} open={editModal}/>
      <Button className="mr-1" type="button" color="primary" onClick={() => setEditModal(true)}>Edit</Button>
      <Button className="ml-1" type="button" color="success" onClick={() => setModal(true)}>Add</Button>
    </div>
  )
}

const mapStateToProps = ({preset}) => {
  const {presets} = preset
  return {presets}
}
export default connect(mapStateToProps, {setSerialInputText, fetchPreset})(PreSetting)
