import React, {useState, useEffect} from 'react'
import {Button, Form, FormGroup, Input, Label} from 'reactstrap'
import useForm from 'react-hook-form'
import isJson from '../helpers/isJson'
import axios from 'axios'
import config from '../config'
import shortkeyHandler from '../helpers/shortkeyHandler'

const SerialInput = ({connection, preset}) => {
  const {register, watch, setValue} = useForm()
  const [error, setError] = useState(undefined)

  useEffect(() => {
    if (preset) {
      const {data} = preset
      setValue('jsonText', JSON.stringify(data, null, 2))
    }
  }, [preset])

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

      const recentSubmits = JSON.parse(localStorage.getItem('recent')) || []
      console.log(recentSubmits)
      const header = JSON.stringify(JSON.parse(watch('jsonText'))).slice(0, 50)
      const data = JSON.stringify(JSON.parse(watch('jsonText')))

      recentSubmits.push({header, data})
      if (recentSubmits.length > 50) {
        recentSubmits.shift()
      }

      localStorage.setItem('recent', JSON.stringify(recentSubmits))
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
        <Input type="textarea" name="jsonText" disabled={!connection} style={{height: '85vh'}} innerRef={register({required: true})} />
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
export default SerialInput
