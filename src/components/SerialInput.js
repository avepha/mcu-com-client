import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Button, Form, FormGroup, Input} from 'reactstrap'
import useForm from 'react-hook-form'
import isJson from '../helpers/isJson'
import axios from 'axios'
import config from '../config'
import shortkeyHandler from '../helpers/shortkeyHandler'

import {addRecent} from '../redux/actions'

const SerialInput = ({connection, addRecent, serialInputText}) => {
  const {register, watch, setValue} = useForm()
  const [error, setError] = useState(undefined)

  useEffect(() => {
    setValue('jsonText', JSON.stringify(serialInputText, null, 2))
    // eslint-disable-next-line
  }, [serialInputText])

  const onFormat = () => {
    setError(undefined)
    const str = watch('jsonText')
    if (isJson(str)) {
      setValue('jsonText', JSON.stringify(JSON.parse(str), null, 2))
    }
    else {
      setError('Json format is invalid')
    }
  }

  const onSubmit = async (e) => {
    if (e) {
      e.preventDefault()
    }

    if (!isJson(watch('jsonText'))) {
      alert('JsonText is invalid')
      return
    }

    try {
      await axios.post(`http://${config.host}:4002/commit`, {
        data: JSON.parse(watch('jsonText'))
      })

      const data = JSON.stringify(JSON.parse(watch('jsonText')))
      addRecent({data})

    } catch ({response}) {
      alert(JSON.stringify(response))
    }
  }

  shortkeyHandler.addEvent('commit', {metaKey: true, shiftKey: true, key: 'Enter'}, () => onSubmit())
  shortkeyHandler.addEvent('format', {metaKey: true, shiftKey: true, key: 'l'}, () => onFormat())

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <div className="row justify-content-lg-between pb-0">
          <div className="ml-3">
            <span className="font-weight-bolder">Input</span>
            <span style={{color: 'red'}}> {error}</span>
          </div>
          <div className="mr-4">
            <Button type="button" color="primary" className="mb-1 btn-sm" onClick={onFormat}>Format</Button>
            {isJson(watch('jsonText')) && <Button type="submit" color="success" className="mb-1 btn-sm">Commit</Button>}
          </div>
        </div>
        <Input type="textarea" name="jsonText" disabled={!connection} style={{height: '85vh'}} innerRef={register({required: true})}/>
      </FormGroup>
    </Form>
  )
}


const mapStateToProps = ({input}) => {
  const {serialInputText} = input
  return {
    serialInputText
  }
}
export default connect(mapStateToProps, {addRecent})(SerialInput)
