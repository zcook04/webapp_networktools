import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { getDevices } from '../../actions/deviceActions'

import '../../css/mydevicecard.css'

function MyDeviceCard(props) {
    const uri = `/mydevices/${props.auth.user}/${props.ipv4}`
    return (
        <Link to={uri} >
            <div className="mydevicecard-card-wrapper">
                <p>{props.ipv4}</p>
                <p>{props.deviceType === "cisco_ios" && "Cisco IOS Device"}</p>
                <p>{props.hasConfig ? "Config Loaded" : "Intial Config Required"}</p>
            </div>
        </Link>
    )
}

const mapDispatchToProps = { getDevices }

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDeviceCard)