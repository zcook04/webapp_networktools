import React from 'react'
import { connect } from 'react-redux'
import { getDevices } from '../actions/deviceActions'

import '../css/mydevicecard.css'

function MyDeviceCard(props) {
    return (
        <div className="mydevicecard-card-wrapper">
            {props.ipv4}
            {props.deviceType}
        </div>
    )
}

const mapDispatchToProps = { getDevices }

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDeviceCard)