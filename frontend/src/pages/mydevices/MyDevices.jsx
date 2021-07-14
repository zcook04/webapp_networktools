import { React, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addNewDevice, getDevices } from '../../actions/deviceActions'
import MyDeviceCard from './MyDeviceCard'

import '../../css/mydevices.css'

//Needs to be a protected page.

function MyDevices(props) {
    const { getDevices, addNewDevice } = props

    const [ipv4, setIpv4] = useState('')
    const [deviceType, setDeviceType] = useState('cisco_ios')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(null)

    useEffect(() => {
        const getData = async () => {
            getDevices()
        }
        getData()
    }, [getDevices]);

    const changeHandler = (e) => {
        switch (e.target.name) {
            case "ipv4":
                setIpv4(e.target.value)
                break;
            case "deviceType":
                setDeviceType(e.target.value)
                break;
            case "username":
                setUsername(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            default:
                break;
        }
    }

    const handleAddNewDevice = () => {
        //Toggle Display Block And Display None
        document.getElementById('addNewDeviceFormWrapper').style.display === "flex" ? document.getElementById('addNewDeviceFormWrapper').style.display = "none" : document.getElementById('addNewDeviceFormWrapper').style.display = "flex"

        document.getElementById('addNewDeviceFormWrapper').style.display === 'flex' && document.getElementById("device-add-ipv4-val").focus()
    }

    const handleSubmit = () => {
        if (!ipv4 || !deviceType || !username || !password){
            setErr('All fields are required')
            setTimeout(() => setErr(null), 3000)
            return
        }

        const success = addNewDevice({'deviceType': deviceType, 'ipv4': ipv4, 'username': username, 'password': password})
        if(!success) {
            setErr('An Error Occurred')
            setTimeout(() => setErr(null), 3000)
        } else {
            setErr('Success')
            setTimeout(() => {
                setErr('')}, 1500)
        }
    }

    const handleCancel = () => {
        document.getElementById('addNewDeviceFormWrapper').style.display = "none"
    }

    const mydevices = props.devices.deviceList
    if (localStorage.token) {
        return (
            <div className="page-wrapper">
                <div id="addNewDeviceFormWrapper">
                <div id="addNewDeviceForm">
                    <h3>Add A New Device</h3>
                    {err && <h5>{err}</h5>}
                    <input type="text" placeholder="deviceType" name="deviceType" value={deviceType} onChange={changeHandler}/>
                    <input type="text" placeholder="ipv4" id="device-add-ipv4-val" name="ipv4" value={ipv4} onChange={changeHandler}/>
                    <input type="text" placeholder="username" name="username" value={username} onChange={changeHandler}/>
                    <input type="text" placeholder="password" name="password" value={password} onChange={changeHandler}/>
                    <div className="add-new-device-btn" onClick={handleSubmit}>Submit</div>
                    <div className="add-new-device-btn-secondary" onClick={handleCancel}>Cancel</div>
                </div>
                </div>
                <div className="mydevices-cards-wrapper">
                    <MyDeviceCard handleAddNewDevice={handleAddNewDevice} name="Add New Device" ipv4="add-new-device" deviceType="New Device"/>
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

const mapDispatchToProps = { getDevices, addNewDevice }

const mapStateToProps = (state) => ({
    auth: state.authState,
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDevices)