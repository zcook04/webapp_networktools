import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { setActiveDevice, getRunningConfig, getDeviceInfo, saveActiveDevice} from '../../actions/deviceActions';
import { connect } from 'react-redux'

import RunningConfigTab from './config-tabs/RunningConfigTab';
import VersionTab from './config-tabs/VersionTab';
import InterfaceTab from './config-tabs/InterfaceTab';
import VlansTab from './config-tabs/VlansTab';
import CdpNeighborsTab from './config-tabs/CdpNeighborsTab';
import RoutingTab from './config-tabs/RoutingTab';

import '../../css/mydeviceinfo.css'

function DeviceInfo(props) {
    const { deviceid } = useParams()
    const { setActiveDevice, getDeviceInfo, saveActiveDevice } = props

    const [tab, setTab] = useState('t-running-cfg')

    useEffect(() => {
        const getData = async () => {
            await setActiveDevice(deviceid)
        }
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      useEffect(() => {
          if(tab){
            document.getElementById(tab).classList.add('active')
          }
        
      }, [tab])

const handleTab = (e) => {
    if (e.target.id === tab)
        return
    document.querySelectorAll('.device-info-config-tab').forEach(tab => tab.classList.remove('active'))
    switch (e.target.id){
        case 't-running-cfg':
            setTab('t-running-cfg')
            break;
        case 't-version':
            setTab('t-version')
            break;
        case 't-interfaces':
            setTab('t-interfaces')
            break;
        case 't-vlans':
            setTab('t-vlans')
            break;
        case 't-cdp-neighbors':
            setTab('t-cdp-neighbors')
            break;
        case 't-routing':
            setTab('t-routing')
            break;
        default:
            setTab('t-running-cfg')
            break;
    }
}

const handleUpdateDevice = async () => {
    const info = await getDeviceInfo(props.devices.activeDevice)
    return info
}

const handleSaveDevice = () => {
    saveActiveDevice(props.devices.activeDevice)
}

const handleDownloadAll = () => {
    return
}

    return (
        <div className="page-wrapper">
            <h1>My Device: {props.devices.activeDevice.name ? props.devices.activeDevice.name : "Unnamed Device"}</h1>
            <div className="update-device-wrapper">
            {props.devices.loading ? "Please wait, Loading..." :
                <><div className="update-device-all-btn" onClick={handleUpdateDevice}>
                    Update Device
                </div>
                <div className="update-device-all-btn" onClick={handleSaveDevice}>
                    Save Device
                </div>
                <div className="update-device-all-btn" onClick={handleDownloadAll}>
                    Download All
                </div></>}
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Serial Number</div>
                <div className="device-info-value">{props.devices.activeDevice.sn && props.devices.activeDevice.sn}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Software Version</div>
                <div className="device-info-value">{props.devices.activeDevice.osSoftware && props.devices.activeDevice.osSoftware}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Device Type</div>
                <div className="device-info-value">{props.devices.activeDevice.deviceType && props.devices.activeDevice.deviceType}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Hostname</div>
                <div className="device-info-value">{props.devices.activeDevice.sn && props.devices.activeDevice.hostname}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Management Address</div>
                <div className="device-info-value">{props.devices.activeDevice.ipv4 && props.devices.activeDevice.ipv4}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Username</div>
                <div className="device-info-value">{props.devices.activeDevice.username && props.devices.activeDevice.username}</div>
            </div>
            <div className="device-info-kv">
                <div className="device-info-key">Password</div>
                <div className="device-info-value">{props.devices.activeDevice.password && props.devices.activeDevice.password}</div>
            </div>
            <div className="device-info-config-tab-wrapper">
                <div className="device-info-config-tab" onClick={handleTab} id='t-running-cfg'>Running Config</div>
                <div className="device-info-config-tab" onClick={handleTab} id='t-version'>Version</div>
                <div className="device-info-config-tab" onClick={handleTab} id='t-interfaces'>Interfaces</div>
                <div className="device-info-config-tab" onClick={handleTab} id='t-vlans'>Vlans</div>
                <div className="device-info-config-tab" onClick={handleTab} id='t-cdp-neighbors'>CDP Neighbors</div>
                <div className="device-info-config-tab" onClick={handleTab} id='t-routing'>Routing</div>
            </div>
            <div className="device-info-config-wrapper">
                {tab === 't-running-cfg' && <RunningConfigTab />}
                {tab === 't-version' && <VersionTab />}
                {tab === 't-interfaces' && <InterfaceTab />}
                {tab === 't-vlans' && <VlansTab />}
                {tab === 't-cdp-neighbors' && <CdpNeighborsTab />}
                {tab === 't-routing' && <RoutingTab />}
            </div>
        </div>
    )
}

const mapDispatchToTops = {
    getRunningConfig,
    getDeviceInfo,
    setActiveDevice,
    saveActiveDevice
}

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToTops)(DeviceInfo)
