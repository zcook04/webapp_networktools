import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getShowCdp, updateDevice } from '../../../actions/deviceActions'

import '../../../css/tabconfig.css'

function CdpNeighborsTab(props) {
    const { getShowCdp, updateDevice } = props
    const [msg, setMsg] = useState('')
    let msgTimeout
    let cfg = null
    if(props.devices.activeDevice.showCdp){
        cfg = props.devices.activeDevice.showCdp.split('\n')
    }

    const sendInfoMessage = (msg) => {
        clearTimeout(msgTimeout)
        setMsg(msg)
        msgTimeout = setTimeout(() => {
            setMsg('')
        },3000)
    }

    const handleGetConfig = async () => {
        const successful = await getShowCdp({...props.devices.activeDevice})
        if (successful){
            sendInfoMessage('Configuration Updated Successfully')
        } else{
            sendInfoMessage('Error Updating Configuration')
        }
    }

    const handleSaveConfig = () => {
        if (props.devices.activeDevice.showCdp ){
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

    const handleDeleteConfig = () => {
        if (props.devices.activeDevice.showCdp ){
            const activeDevice = props.devices.activeDevice
            activeDevice['showCdp'] = ''
            const successful = updateDevice(activeDevice)
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
        const f = new Blob([props.devices.activeDevice.showCdp.replace('\n', "\r\n")])
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
                <div className="getConfig-btn" onClick={handleSaveConfig}>
                    Save             
                </div>
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
    getShowCdp,
    updateDevice
}

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(CdpNeighborsTab)
