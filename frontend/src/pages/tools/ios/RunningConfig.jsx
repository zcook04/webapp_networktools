import React, {useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getDevices } from '../../../actions/deviceActions'
import '../../../css/runningconfig.css'

function RunningConfig(props) {
    const [runningConfig, setRunningConfig] = useState(null)
    const [configGetError, setConfigGetError] = useState(false)
    const [myfile, setMyFile] = useState('')
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
                setMyFile(data['data'])
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

    // Formats and downloads running configuration
    const getFile = (e) => {
        const date = new Date()
        const m = date.getMonth()
        const d = date.getDay()
        const y = date.getFullYear()
        const element = document.createElement('a');
        const f = new Blob([myfile.replace('\n', "\r\n")])
        element.href = URL.createObjectURL(f)
        element.download = `${ipv4}-conf-${m}-${d}-${y}.txt`
        document.body.appendChild(element)
        element.click()
    }

    return (
        <div className="page-wrapper">
            <form onSubmit={getConfig}>
                <input type='text' value={ipv4} placeholder="Ipv4" onChange={handleChange} name='ipv4' />
                <input type='text' value={username} placeholder="Username" onChange={handleChange} name='username' />
                <input type='password' value={password} placerholder="Password" onChange={handleChange} name='password' />
                <input type='submit' value='submit'/>
            </form>
                {runningConfig && 
                    <div className="running-config-download-btn-div">
                            <div onClick={getFile} className="running-config-download-btn">Download File</div>
                    </div>
                }


            <div className="running-config-output">
                {loading && <div><h3>Please wait</h3><p>Attempting to retrieve running configuration</p></div>}
                {configGetError && <div><h3>And Error Occured</h3><p>Error retrieving running configuration</p></div>}
                {runningConfig && runningConfig.map((i, key) => <div key={key}>{i}</div>)}
            </div>
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
