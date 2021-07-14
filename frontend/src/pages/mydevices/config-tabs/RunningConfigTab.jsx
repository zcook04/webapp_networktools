import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getRunningConfig, updateDevice } from '../../../actions/deviceActions'

import '../../../css/tabrunningconfig.css'

function RunningConfigTab(props) {
    const {getRunningConfig, updateDevice} = props
    const [msg, setMsg] = useState('')
    let msgTimeout
    let cfg = null
    if(props.devices.activeDevice.runningConfig){
        cfg = props.devices.activeDevice.runningConfig.split('\n')
    }

    const sendInfoMessage = (msg) => {
        clearTimeout(msgTimeout)
        setMsg(msg)
        msgTimeout = setTimeout(() => {
            setMsg('')
        },3000)
    }

    const handleGetConfig = async () => {
        const successful = await getRunningConfig({...props.devices.activeDevice})
        if (successful){
            sendInfoMessage('Updated Configuration')
        } else{
            sendInfoMessage('Error Updating Configuration')
        }
    }

    const handleSaveConfig = () => {
        if (props.devices.activeDevice.runningConfig ){
            const successful = updateDevice(props.devices.activeDevice)
            if(successful) {
                sendInfoMessage('Configuration Saved Successfully')
            } else {
                sendInfoMessage('An Error Occurred Saving To Database.')
            }
        } else {
            sendInfoMessage('No Configuration To Save.')
        }   
    }

    return (
        <>
        <div className="deviceinfo-row">
            <p>{msg && msg}</p>
        </div>
        {props.devices.loading ? <h3>Please Wait...</h3> 
        :<div className="deviceupdate-row">
            <div className="getConfig-btn" onClick={handleGetConfig}>
                Get Updated Config                
            </div>
            <div className="getConfig-btn" onClick={handleSaveConfig}>
                Save Current Config              
            </div>
        </div>}

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
