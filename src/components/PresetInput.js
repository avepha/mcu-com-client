import React, {useEffect} from 'react'
import {Input} from 'reactstrap'
import {connect} from 'react-redux'
import {fetchPreset, setSerialInputText} from '../redux/actions'

const PresetInput = ({presets, fetchPreset, onChange = () => null}) => {
  useEffect(() => {
    fetchPreset()
  }, [])

  return (
    <Input type="select" style={{width: '20ch'}} onChange={({target}) => target.value !== -1 && onChange({inputText: presets[target.value].data})}>
      {presets.map(({header, data}, index) => <option key={index} value={index}>{header}</option>)}
    </Input>
  )
}

const mapStateToProps = ({preset}) => {
  const {presets} = preset
  return {presets}
}

export default connect(mapStateToProps, {setSerialInputText, fetchPreset})(PresetInput)
