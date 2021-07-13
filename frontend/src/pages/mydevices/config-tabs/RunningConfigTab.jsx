import React from 'react'
import { connect } from 'react-redux'

import '../../../css/tabrunningconfig.css'

function RunningConfigTab(props) {
    let cfg = null
    if(props.devices.ActiveDevice.runningConfig){
        cfg = props.devices.ActiveDevice.runningConfig.split('\\n')
    }

    const handleClick = (e) => {

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



const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps)(RunningConfigTab)
