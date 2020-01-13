import React, {Fragment, useState} from 'react'
import {Col, Row} from 'reactstrap'
import SelectPortInput from './components/SelectPortInput'
import SerialInput from './components/SerialInput'
import SerialOutput from './components/SerialOutput'
import PresetInput from './components/PresetInput'
import './helpers/shortkeyHandler'
import pkg from '../package.json'

function App() {
  const [isPortOpen, setIsPortOpen] = useState(false)
  const [preset, setPreset] = useState()
  return (
    <Fragment>
      <div className="ml-3 mr-3" >
        <SelectPortInput onStatusChange={(status) => setIsPortOpen(status)}/>
        <Row>
          <Col xs="12">
            {isPortOpen && <PresetInput onSelect={(preset) => setPreset(preset)}/>}
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <SerialInput connection={isPortOpen} preset={preset}/>
          </Col>
          <Col xs="6">
            <SerialOutput connection={isPortOpen}/>
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
