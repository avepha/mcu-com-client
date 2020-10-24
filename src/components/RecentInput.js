import React from 'react'
import {Col, Input} from 'reactstrap'
import {connect} from 'react-redux'
import {delRecentAll, setSerialInputText} from '../redux/actions'

const RecentInput = ({recentList, setSerialInputText}) => {
  return (
    <div className="d-flex justify-content-start">
      <span className="font-weight-bolder mr-3">Recent: </span>
      <Input type="select" onChange={({target}) => target.value !== -1 && setSerialInputText({inputText: JSON.parse(recentList[target.value])})}>
        {recentList.map((recent, index) => <option key={index} value={index}>{recent.slice(0, 100)}</option>)}
      </Input>
    </div>
  )
}

const mapStateToProps = ({recent}) => {
  const {recentList} = recent
  return {
    recentList
  }
}
export default connect(mapStateToProps, {delRecentAll, setSerialInputText})(RecentInput)
