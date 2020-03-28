import React from 'react'
import {Col, FormGroup, Input, Label} from 'reactstrap'
import {connect} from 'react-redux'
import {delRecentAll, setSerialInputText} from '../redux/actions'

const RecentInput = ({recentList, setSerialInputText}) => {
  return (
    <FormGroup row>
      <Label xs={1}>
        <span className="font-weight-bolder">Recent: </span>
      </Label>
      <Col xs={7}>
        <Input type="select" onChange={({target}) => target.value !== -1 && setSerialInputText({inputText: JSON.parse(recentList[target.value])})}>
          {recentList.map((recent, index) => <option key={index} value={index}>{recent.slice(0, 100)}</option>)}
        </Input>
      </Col>
      <Col xs={2}>
        {/*<Button type="button" color="danger" className="form-control" onClick={delRecentAll}>Clear</Button>*/}
      </Col>
    </FormGroup>
  )
}

const mapStateToProps = ({recent}) => {
  const {recentList} = recent
  return {
    recentList
  }
}
export default connect(mapStateToProps, {delRecentAll, setSerialInputText})(RecentInput)
