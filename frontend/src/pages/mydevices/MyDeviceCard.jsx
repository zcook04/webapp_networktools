import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { getDevices } from '../../actions/deviceActions'

import iosImage from '../../imgs/icons/ios-device.png'
import asaImage from '../../imgs/icons/asa-device.png'

import '../../css/mydevicecard.css'

function MyDeviceCard(props) {
    const uri = `/mydevices/${props.ipv4}`
    return (
        <Link to={uri} >
            <div className="mydevicecard-card-wrapper">
                <p>{props.ipv4}</p>
                <div className="mydevicecard-img">
                    {props.deviceType === "cisco_ios" &&
                        <img src={iosImage} alt="ios-img" />}
                    {props.deviceType === "cisco_asa" &&
                        <img src={asaImage} alt="asa-img" />}
            </div>
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