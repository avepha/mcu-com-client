import React, {Fragment, useState} from 'react'
import {Col, Row} from 'reactstrap'
import SelectPortInput from './components/SelectPortInput'
import SerialInput from './components/SerialInput'
import SerialOutput from './components/SerialOutput'
import PresetInput from './components/PresetInput'
import RecentInput from './components/RecentInput'
import LogOutput from './components/LogOutput'

import './helpers/shortkeyHandler'
import pkg from '../package.json'

function App() {
  const [isPortOpen, setIsPortOpen] = useState(false)

  return (
    <Fragment>
      <div className="ml-3 mr-3">
        <Row>
          <Col xs="6">
            <SelectPortInput onStatusChange={(status) => setIsPortOpen(status)}/>
          </Col>
          <Col xs="6">
            {isPortOpen && <PresetInput />}
          </Col>
        </Row>
        <Row>

          <Col xs="6">
            {isPortOpen && <RecentInput />}
          </Col>
        </Row>

        <Row>
          <Col xs="5" style={{padding: 1}}>
            <SerialInput connection={isPortOpen}/>
          </Col>
          <Col xs="7" style={{padding: 1}}>
            <SerialOutput connection={isPortOpen}/>
            <LogOutput connection={isPortOpen}/>
          </Col>
        </Row>
      </div>
      <span className="position-absolute" style={{bottom: 5, left: 5}}>
        version: {pkg.version}
      </span>
    </Fragment>
  )
}

export default App
