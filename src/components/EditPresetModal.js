import React, {useEffect, useState} from 'react'
import {Button, Modal, ModalBody, ModalHeader, Table} from 'reactstrap'
import axios from 'axios'
import config from '../config'

const EditPresetModal = ({open = false, close = () => null}) => {
  const [presets, setPreset] = useState([])
  useEffect(() => {
    axios.get(`http://${config.host}:4002/saves`).then(({data}) => {
      const nPresets = data.map(({id, header, data}) => ({id, header, data}))
      setPreset(nPresets)
    })
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
                  <Button type="button" color="danger" size="sm" style={{width: 60}}>Delete</Button>
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

export default EditPresetModal
