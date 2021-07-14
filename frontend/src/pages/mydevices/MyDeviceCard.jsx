import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { getDevices } from '../../actions/deviceActions'

import iosImage from '../../imgs/icons/ios-device.png'
import asaImage from '../../imgs/icons/asa-device.png'
import newDeviceImage from '../../imgs/icons/add-device.png'
import removeDeviceImage from '../../imgs/icons/remove-device.png'

import '../../css/mydevicecard.css'

function MyDeviceCard(props) {
    if (props.name === "Add New Device"){
        return (
            <div className="mydevicecard-card-outer-wrapper">
                <Link to="/">
                <div className="mydevicecard-card-wrapper">
                    <p>{props.name}</p>
                    <div className="mydevicecard-img">
                        <img src={newDeviceImage} alt="Add Device" />
                    </div>
                </div>
                </Link>
            </div>
            
        )
    } else {
        const uri = `/mydevices/${props.ipv4}`
        return (
            <div className="mydevicecard-card-outer-wrapper">
            <Link to="/">
                <img src={removeDeviceImage} className="mydevicecard-remove-item" alt="remove device" />
            </Link>
            <Link to={uri} >
                <div className="mydevicecard-card-wrapper">
                    <p>{props.name || props.ipv4}</p>
                    <div className="mydevicecard-img">
                        {props.deviceType === "cisco_ios" &&
                            <img src={iosImage} alt="ios-img" />}
                        {props.deviceType === "cisco_asa" &&
                            <img src={asaImage} alt="asa-img" />}
                    </div>
                </div>
            </Link>
            </div>
        )
    }
}

const mapDispatchToProps = { getDevices }

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDeviceCard)