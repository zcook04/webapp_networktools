import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getRunningConfig, updateDevice } from '../../../actions/deviceActions'

import '../../../css/tabrunningconfig.css'

function RunningConfigTab(props) {
    const {getRunningConfig, updateDevice} = props
    let cfg = null
    if(props.devices.activeDevice.runningConfig){
        cfg = props.devices.activeDevice.runningConfig.split('\n')
    }

    const handleClick = (e) => {
        getRunningConfig({...props.devices.activeDevice})
    }

    useEffect(() => {
        if(props.devices.activeDevice.runningConfig){
            updateDevice(props.devices.activeDevice)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.devices.activeDevice])

    return (
        <>
            <div className="getConfig-btn" onClick={handleClick}>
                {props.devices.loading ? 'Loading Config' :'Update Config'}                
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
