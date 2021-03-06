import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getRunningConfig, saveActiveDevice } from '../../../actions/deviceActions'

import '../../../css/tabconfig.css'

function RunningConfigTab(props) {
    const {getRunningConfig, saveActiveDevice} = props
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
            sendInfoMessage('Configuration Updated Successfully')
        } else{
            sendInfoMessage('Error Updating Configuration')
        }
    }

    const handleDeleteConfig = () => {
        if (props.devices.activeDevice.runningConfig ){
            const activeDevice = props.devices.activeDevice
            activeDevice['runningConfig'] = ''
            const successful = saveActiveDevice(activeDevice)
            if(successful) {
                sendInfoMessage('Configuration Deleted Successfully')
            } else {
                sendInfoMessage('An Error Occurred Deleting From Database.')
            }
        } else {
            sendInfoMessage('No Configuration To Delete.')
        }   
    }

    const handleDownload = () => {
        const date = new Date()
        const m = date.getMonth()
        const d = date.getDay()
        const y = date.getFullYear()
        const element = document.createElement('a');
        const f = new Blob([props.devices.activeDevice.runningConfig.replace('\n', "\r\n")])
        element.href = URL.createObjectURL(f)
        element.download = `${props.devices.activeDevice.ipv4}-conf-${m}-${d}-${y}.txt`
        document.body.appendChild(element)
        element.click()
    }

    return (
        <>

        <div className="deviceinfo-row">
            <p>{msg && msg}</p>
        </div>

        {props.devices.loading ? <h3>Please Wait...</h3> 
        :
        <div className="deviceupdate-wrapper">
            <div className="deviceupdate-row">
                <div className="getConfig-btn" onClick={handleGetConfig}>
                    Update            
                </div>
                <div className="getConfig-btn" onClick={handleDownload}>
                    Download            
                </div>
            </div>
            <div className="deviceupdate-row">
                <div className="getConfig-btn" onClick={handleDeleteConfig}>
                    Delete             
                </div>
            </div>
        
        </div>}

            {cfg && !props.devices.loading && cfg.map((line, key) => <div key={key}>{line}</div>)}
        </>
    )
}

const mapDispatchToProps = {
    getRunningConfig,
    saveActiveDevice
}

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(RunningConfigTab)
