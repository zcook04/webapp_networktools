import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getDeviceInfo, getRunningConfig} from '../../actions/deviceActions';
import { connect } from 'react-redux'

import '../../css/deviceinfo.css'

function DeviceInfo(props) {
    const { deviceid } = useParams()
    const { getDeviceInfo } = props
    const [device, setDevice] = useState({})
    const [runningConfig, setRunningConfig] = useState('')
    useEffect(() => {
        const getData = async () => {
            const data = await getDeviceInfo(deviceid)
            setDevice(data)
            if(data.runningConfig){
            setRunningConfig(data.runningConfig.split('\\n'))
        }}
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <div className="page-wrapper">
            <h1>My Device: {device.name ? device.name : "Unnamed Device"}</h1>
            <div className="device-info-kv">
                <div className="device-info-key">Serial Number</div>
                <div className="device-info-value">{device.sn && device.sn}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Software Version</div>
                <div className="device-info-value">{device.osSoftware && device.osSoftware}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Device Type</div>
                <div className="device-info-value">{device.deviceType && device.deviceType}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Hostname</div>
                <div className="device-info-value">{device.sn && device.hostname}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Management Address</div>
                <div className="device-info-value">{device.ipv4 && device.ipv4}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Username</div>
                <div className="device-info-value">{device.username && device.username}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Password</div>
                <div className="device-info-value">{device.password && device.password}</div>
            </div>
            <div className="device-info-config-tab-wrapper">
                <div className="device-info-config-tab">Running Config</div>
                <div className="device-info-config-tab">Version</div>
                <div className="device-info-config-tab">Interfaces</div>
                <div className="device-info-config-tab">Addresses</div>
                <div className="device-info-config-tab">Vlans</div>
                <div className="device-info-config-tab">CDP Neighbors</div>
                <div className="device-info-config-tab">OSPF</div>
                <div className="device-info-config-tab">EIGRP</div>
            </div>
            <div className="device-info-config-wrapper">
                {runningConfig && runningConfig.map((i, key) => <div key={key}>{i}</div>)}
            </div>
        </div>
    )
}

const mapDispatchToTops = {
    getRunningConfig,
    getDeviceInfo
}

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToTops)(DeviceInfo)
