import React, {useEffect, useState} from 'react'
import axios from 'axios'

function RunningConfig() {
    const [runningConfig, setRunningConfig] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('api/v1/running-config/192.168.50.2');
            if (result.data['data']){
                setRunningConfig(result.data['data'])
            }
            else {
                setRunningConfig('No configuration to display')
            }
        }
        fetchData()
    },[])

    return (
        <div className="page-wrapper">
            {runningConfig && runningConfig}
        </div>
    )
}

export default RunningConfig
