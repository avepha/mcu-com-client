import React, {useState} from 'react'
import {Button, Form, FormGroup, Input, Label} from 'reactstrap'
import useForm from 'react-hook-form'
import isJson from '../helpers/isJson'
import axios from 'axios'

const SerialInput = ({connection}) => {
  const {register, watch, setValue} = useForm()
  const [error, setError] = useState(undefined)
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
    e.preventDefault()

    try {
      await axios.post('http://localhost:4002/commit', {
        data: JSON.parse(watch('jsonText'))
      })
    }
    catch ({response}) {
      alert(JSON.stringify(response))
    }
  }

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
        { isJson(watch('jsonText')) &&
          <Button type="submit" color="success" className="m-1">Commit</Button>
        }
      </div>}
    </Form>
  )
}
export default SerialInput
