import React, {useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getDevices } from '../../../actions/deviceActions'

function RunningConfig(props) {
    const [runningConfig, setRunningConfig] = useState(null)
    const [configGetError, setConfigGetError] = useState(false)
    const [ipv4, setIpv4] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    
    const getConfig = async (e) => {
        e.preventDefault()
        if (ipv4 && username && password) {
            setLoading(true)
            setRunningConfig("")
            setConfigGetError(false)
            try {
                const data = await axios.post('/api/v1/tools/get-running-config', {"ipv4": ipv4, "username": username, "password": password})
                setRunningConfig(data['data'].split('\n'))
                setConfigGetError(false)
            } catch (err) {
                setConfigGetError(err)
            }
            setLoading(false)
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
                <input type='text' value={ipv4} placeholder="Ipv4" onChange={handleChange} name='ipv4' />
                <input type='text' value={username} placeholder="Username" onChange={handleChange} name='username' />
                <input type='password' value={password} placerholder="Password" onChange={handleChange} name='password' />
                <input type='submit' value='submit'/>
            </form>
            {loading && <div><h3>Please wait</h3><p>Attempting to retrieve running configuration</p></div>}
            {configGetError && <div><h3>And Error Occured</h3><p>Error retrieving running configuration</p></div>}
            {runningConfig && runningConfig.map((i, key) => <div key={key}>{i}</div>)}
        </div>
    )
}

const mapDispatchToProps = {
    getDevices
}

const mapStateToProps = (state) => ({
    devices: state.deviceState
})

export default connect(mapStateToProps, mapDispatchToProps)(RunningConfig)
