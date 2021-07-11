import React, {useState} from 'react'
import axios from 'axios'

function RunningConfig() {
    const [runningConfig, setRunningConfig] = useState(null)

    const [ipv4, setIpv4] = useState("ipv4")
    const [username, setUsername] = useState("Username")
    const [password, setPassword] = useState("Password")

    const getConfig = async (e) => {
        e.preventDefault()
        if (ipv4 && username && password) {
            const data = await axios.post('/api/v1/running-config', {"ipv4": ipv4, "username": username, "password": password})
            if (data) {
                setRunningConfig(data['data'].split('\n'))
            }
        } else {
            console.log('Input username, password and ipv4 address.')
        }
    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value)
                break;
            case 'ipv4':
                setIpv4(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                console.log('Default Case Reached')
                break;
        }
    }

    return (
        <div className="page-wrapper">
            <form onSubmit={getConfig}>
                <input type='text' value={ipv4} onChange={handleChange} name='ipv4' />
                <input type='text' value={username} onChange={handleChange} name='username' />
                <input type='text' value={password} onChange={handleChange} name='password' />
                <input type='submit' value='submit'/>
            </form>
            {runningConfig && runningConfig.map((i, key) => <div key={key}>{i}</div>)}
        </div>
    )
}

export default RunningConfig
