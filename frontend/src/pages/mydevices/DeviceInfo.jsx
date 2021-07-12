import React from 'react'
import { useParams } from 'react-router-dom'

function DeviceInfo() {
    const { deviceid } = useParams()
    return (
        <div className="page-wrapper">
            <h1>My Device</h1>
            {console.log(deviceid)}
        </div>
    )
}

export default DeviceInfo
