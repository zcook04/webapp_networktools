import React from 'react'
import { connect } from 'react-redux'
import { getRunningConfig, updateDevice } from '../../../actions/deviceActions'

import '../../../css/tabrunningconfig.css'

function RunningConfigTab(props) {
    const {getRunningConfig, updateDevice} = props
    let cfg = null
    if(props.devices.activeDevice.runningConfig){
        cfg = props.devices.activeDevice.runningConfig.split('\n')
    }

    const handleGetConfig = () => {
        getRunningConfig({...props.devices.activeDevice})
    }

    const handleSaveConfig = () => {
        if (props.devices.activeDevice.runningConfig ){
            updateDevice(props.devices.activeDevice)
        } else {
            console.log('No Running-Configuration To Save.')
        }
        
    }

    return (
        <>
        <div className="deviceupdate-row">
            <div className="getConfig-btn" onClick={handleGetConfig}>
                Get Updated Config                
            </div>
            <div className="getConfig-btn" onClick={handleSaveConfig}>
                Save Current Config              
            </div>
        </div>
            {cfg && !props.devices.loading && cfg.map((line, key) => <div key={key}>{line}</div>)}
            {!cfg && <>
            <h3>No Running Configuration Saved</h3> 
            </>}
        </>
    )
}

const mapDispatchToProps = {
    getRunningConfig,
    updateDevice
}

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(RunningConfigTab)
