import React from 'react'
import { connect } from 'react-redux'
import { getRunningConfig } from '../../../actions/deviceActions'

import '../../../css/tabrunningconfig.css'

function RunningConfigTab(props) {
    const getRunningConfig = props.getRunningConfig
    let cfg = null
    if(props.devices.activeDevice.runningConfig){
        cfg = props.devices.activeDevice.runningConfig.split('\\n')
    }

    const handleClick = (e) => {
        getRunningConfig({'ipv4': props.devices.activeDevice.ipv4, 'username': props.devices.activeDevice.username, 'password': props.devices.activeDevice.password})
    }

    return (
        <>
            {cfg && cfg.map((line, key) => <div key={key}>{line}</div>)}
            {!cfg && <>
            <h3>No Running Configuration Saved</h3>
            <div className="getConfig-btn" onClick={handleClick}>
                Get Running Configuration
            </div> 
            </>}
        </>
    )
}

const mapDispatchToProps = {
    getRunningConfig
}

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(RunningConfigTab)
