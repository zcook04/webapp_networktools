import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { getDeviceInfo } from '../../actions/deviceActions';

function DeviceInfo() {
    const { deviceid } = useParams()
    const [device, setDevice] = useState({})
    useEffect(() => {
        const getData = async (ip) => {
            const data = await getDeviceInfo(ip)
            setDevice(data)
        }
        getData(deviceid)
      }, [deviceid]);

    return (
        <div className="page-wrapper">
            <h1>My Device {deviceid}</h1>
            {console.log(device)}
        </div>
    )
}

export default DeviceInfo
