import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Button, Form, FormGroup, Input, Label} from 'reactstrap'
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
    } else {
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
        <Label>
          Input
          <span style={{color: 'red'}}> {error}</span>
        </Label>
        <Input type="textarea" name="jsonText" disabled={!connection} style={{height: '85vh'}} innerRef={register({required: true})}/>
      </FormGroup>
      {connection && <div className="w-100 text-right">
        <Button type="button" color="primary" className="m-1" onClick={onFormat}>Format</Button>
        {isJson(watch('jsonText')) &&
        <Button type="submit" color="success" className="m-1">Commit</Button>
        }
      </div>}
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
