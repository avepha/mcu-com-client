import React from 'react'
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Label} from 'reactstrap'

const AddPresetModal = ({open = false, close = () => null}) => {
  return (
    <Modal isOpen={open} toggle={close} size="lg">
      <ModalHeader toggle={close}>
        Add Preset
      </ModalHeader>
      <ModalBody>
        <Label><strong>Title</strong></Label>
        <Input type="text" size="lg"/>
        <Label><strong>Preset data</strong></Label>
        <Input type="textarea" size="lg" style={{height: '40vh'}}/>
        <div className="w-100 text-right m-2">
          <Button type="button" color="primary" size="lg" onClick={() => null}>Format</Button>
        </div>
      </ModalBody>
      <ModalFooter>
        <div  className="w-100 text-right">
          <Button type="button" color="danger" size="lg" onClick={close}>Discard</Button>
          <Button className="ml-2" type="button" color="success" size="lg">Add Preset</Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default AddPresetModal
