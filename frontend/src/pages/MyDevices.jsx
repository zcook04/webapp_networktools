import { React, useEffect } from 'react'
import { connect } from 'react-redux'

import { getDevices } from '../actions/deviceActions';
import MyDeviceCard from '../components/MyDeviceCard'

//Needs to be a protected page.

function MyDevices(props) {
    const { getDevices } = props

    useEffect(() => {
        const getData = async () => {
            getDevices()
        }
        getData()
    }, [getDevices]);

    const mydevices = props.devices.DeviceList

    return (
        <div className="page-wrapper">
            {mydevices && mydevices.map(device => {
                return (
                    <MyDeviceCard
                        key={device.ipv4}
                        ipv4={device.ipv4}
                        deviceType={device.deviceType}
                        hasConfig={device.runningConfig}
                        lastUpdate={device.lastUpdate}
                    />
                )
            })}
        </div>
    )
}

const mapDispatchToProps = { getDevices }

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDevices)