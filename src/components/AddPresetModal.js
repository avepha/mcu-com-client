import React from 'react'
import useForm from 'react-hook-form'
import axios from 'axios'
import config from '../config'
import {Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import isJson from '../helpers/isJson'

const AddPresetModal = ({open = false, close = () => null}) => {
  const {register, getValues, triggerValidation, errors, watch, setValue} = useForm()
  return (
    <Modal isOpen={open} toggle={close} size="lg">
      <ModalHeader toggle={close}>
        Add Preset
      </ModalHeader>
      <ModalBody>
        <Label><strong>Title</strong> {errors.title && <p style={{color: 'red'}}>title is required.</p>}</Label>
        <Input name="title" type="text" size="lg" innerRef={register({required: true})}/>

        <Label><strong>Preset data</strong>
          {errors.presetData && errors.presetData.type === 'required' && <p style={{color: 'red'}}>preset is required.</p>}
          {errors.presetData && errors.presetData.type === 'validate' && <p style={{color: 'red'}}>preset must be json format.</p>}
        </Label>
        <Input name="presetData" type="textarea" size="lg" style={{height: '40vh'}} innerRef={register({
          required: true,
          validate: v => isJson(v)
        })}/>

        <div className="w-100 text-right m-2">
          { isJson(watch('presetData')) && <Button type="button" color="primary" size="lg" onClick={() => {
            const presetText = watch('presetData')
            setValue('presetData', JSON.stringify(JSON.parse(presetText), null, 2))
          }}>Format</Button>}
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="w-100 text-right">
          <Button type="button" color="danger" size="lg" onClick={close}>Discard</Button>
          <Button className="ml-2" type="button" color="success" size="lg" onClick={async () => {
            const isValid = await triggerValidation()
            if (!isValid) {
              return null;
            }
            const {title, presetData} = getValues();
            await axios.post(`http://${config.host}:4002/saves`, {
              header: title,
              data: JSON.parse(presetData)
            }).catch(err => console.log(err))

            close()
          }}>Add Preset</Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default AddPresetModal
