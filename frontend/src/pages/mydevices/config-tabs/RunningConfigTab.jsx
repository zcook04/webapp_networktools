import React from 'react'
import { connect } from 'react-redux'

function RunningConfigTab(props) {
    let cfg = null
    if(props.devices.ActiveDevice.runningConfig){
        cfg = props.devices.ActiveDevice.runningConfig.split('\\n')
    }
    return (
        <>
            {cfg && cfg.map((line, key) => <div key={key}>{line}</div>)}
        </>
    )
}



const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps)(RunningConfigTab)
