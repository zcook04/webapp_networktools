import { React, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
    if (props.auth.isAuthenticated) {
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
    } else {
        return (
            <div className="page-wrapper">
                <h3>You must be logged in to view your devices</h3>
                <p><Link to="/login">Login</Link></p>
            </div>
        )
    }

}

const mapDispatchToProps = { getDevices }

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDevices)