import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {Col, Row} from 'reactstrap'

import SelectPortInput from './components/SelectPortInput'
import SerialInput from './components/SerialInput'
import SerialOutput from './components/SerialOutput'
import RecentInput from './components/RecentInput'
import LogOutput from './components/LogOutput'
import PreSetting from './components/Presetting'

import './helpers/shortkeyHandler'

function App({connection}) {
  const [numOfInput, setNumOfInput] = useState(1)
  return (
    <Fragment>
      <div className="ml-3 mr-3 mt-3">
        <Row>
          <Col xs="5">
            <SelectPortInput/>
          </Col>
          <Col xs="7">
            <Row>
              <Col xs={8}>
                {connection && <RecentInput/>}
              </Col>
              <Col xs={4}>
                <PreSetting/>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs="5" style={{padding: 1}}>
            {
              [...Array(numOfInput)].map((_, index) => {
                return <SerialInput key={index}/>
              })
            }
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-primary btn-circle btn-md m-1 p-0" onClick={() => setNumOfInput(numOfInput + 1)}>
                <span style={{fontSize: '1.5rem'}}>+</span>
              </button>
              {
                numOfInput > 0 && <button type="button" className="btn btn-danger btn-circle btn-md m-1  p-0" onClick={() => setNumOfInput(numOfInput <= 0 ? 0 : numOfInput - 1)}>
                  <span style={{fontSize: '1.5rem'}}>-</span>
                </button>
              }
            </div>
          </Col>
          <Col xs="7" style={{padding: 1}}>
            <SerialOutput/>
            <LogOutput/>
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

const mapStateToProps = ({input, connection}) => {
  const {serialInputText} = input
  return {
    serialInputText,
    connection: connection.connection
  }
}

export default connect(mapStateToProps)(App)
