import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchPreset, deletePreset} from '../redux/actions'
import {Button, Modal, ModalBody, ModalHeader, Table} from 'reactstrap'

const EditPresetModal = ({open = false, close = () => null, presets, fetchPreset, deletePreset}) => {
  useEffect(() => {
    fetchPreset()
    // eslint-disable-next-line
  }, [])

  return (
    <Modal isOpen={open} toggle={close} size="lg">
      <ModalHeader toggle={close}>
        Edit Preset
      </ModalHeader>
      <ModalBody>
        <Table responsive>
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Data</th>
            <th>OP</th>
          </tr>
          </thead>
          <tbody>
          {
            presets.map(({id, header, data}) => (
              <tr key={id}>
                <th scope="row">{id}</th>
                <td>{header}</td>
                <td>{JSON.stringify(data).slice(0, 50)}</td>
                <td>
                  <Button type="button" color="danger" size="sm" style={{width: 60}} onClick={() => deletePreset(id)}>Delete</Button>
                  <Button type="button" color="primary" size="sm" style={{width: 60}} className="ml-1">Edit</Button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  )
}

export default connect(({preset}) => ({
  presets: preset.presets
}), {fetchPreset, deletePreset})(EditPresetModal)
