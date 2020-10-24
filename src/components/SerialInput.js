import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Button, Form, FormGroup, Input} from 'reactstrap'
import useForm from 'react-hook-form'
import isJson from '../helpers/isJson'
import axios from 'axios'
import config from '../config'
import shortkeyHandler from '../helpers/shortkeyHandler'

import {addRecent} from '../redux/actions'
import PresetInput from './PresetInput'

const SerialInput = ({connection, addRecent}) => {
  const [inputText, setInputText] = useState()
  const {register, watch, setValue} = useForm()
  const [error, setError] = useState(undefined)

  useEffect(() => {
    setValue('jsonText', JSON.stringify(inputText, null, 2))
    // eslint-disable-next-line
  }, [inputText])

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
        <div className="textarea-container">
          <Input type="textarea" name="jsonText" disabled={!connection} style={{height: '30vh'}} innerRef={register({required: true})}/>
          <div className="textarea-container corner-button">
            <span style={{color: 'red'}}> {error}</span>

            {
              connection && <PresetInput onChange={({inputText}) => setInputText(inputText)}/>
            }

            <Button type="button" color="primary" className="mb-1 btn-sm" onClick={onFormat}>Format</Button>

            {
              isJson(watch('jsonText')) && <Button type="submit" color="success" className="mb-1 btn-sm">Commit</Button>
            }

          </div>
        </div>
      </FormGroup>
    </Form>
  )
}

const mapStateToProps = ({input, connection}) => {
  const {serialInputText} = input
  return {
    serialInputText,
    connection: connection.connection
  }
}

export default connect(mapStateToProps, {addRecent})(SerialInput)
