import React, {useEffect, useState} from 'react'
import {Button, Col, FormGroup, Input, Label} from 'reactstrap'


const RecentInput = ({onSelect}) => {
  const [recent, setRecent] = useState([])

  const updateLocalStorage = () => {
    setRecent(JSON.parse(localStorage.getItem('recent')) || [])
  }

  const clearLocalStorage = () => {
    localStorage.removeItem('recent');
    updateLocalStorage()
  }

  useEffect(() => {
    updateLocalStorage()
    // eslint-disable-next-line
  }, [])

  return (
    <FormGroup row>
      <Label xs={1}>Recent: </Label>
      <Col xs={7}>
        <Input type="select" onChange={({target}) => target.value !== -1 && onSelect({
          header: recent[target.value].header,
          data: JSON.parse(recent[target.value].data)
        })}>
          {recent.map(({header, data}, index) => <option key={index} value={index}>{header}</option>)}
        </Input>
      </Col>
      <Col xs={2}>
        <Button type="button" color="danger" className="form-control" onClick={clearLocalStorage}>Clear</Button>
      </Col>
    </FormGroup>
  )
}

export default RecentInput
