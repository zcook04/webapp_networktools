import axios from 'axios'
import { CLEAR_LOADING, GET_DEVICES, SET_ACTIVE_DEVICE, SET_LOADING, UPDATE_RUNNING_CFG, UPDATE_SUCCESSFUL, UPDATE_FAILED} from "./actions";


export const getDevices = () => async (dispatch) => {
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }
    const deviceList = await axios('/api/v1/mydevices', config)
    if(deviceList) {
        dispatch({type: GET_DEVICES, payload: deviceList.data})
    } else {
        console.log('Error Retrieving Devices')
        return
    }
}

// LOADS SINGLE DEVICE INTO STATE AS ACTIVE DEVICE
export const setActiveDevice = (device) => async (dispatch) => {
    const uri = `/api/v1/mydevices/device/${device}`
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    }

    const deviceInfo = await axios(uri, config)

    if(deviceInfo){
        dispatch({type: SET_ACTIVE_DEVICE, payload: deviceInfo.data})
        return deviceInfo.data
    }
}

export const updateDevice = (device) => async (dispatch) => {
    // PUT dictionary with single value to api. Ie {runningConfig: "value"}
    // SUCCESSFUL POST returns new device object.
    // deviceList gets updated.  activeDevice gets updated.
    const uri = `/api/v1/mydevice/device/${device.ipv4}`
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }

    //put updated values and return updated object
    console.log('updating device')
    dispatch({type: SET_LOADING})
    try{
        await axios.put(uri, device, config)
        dispatch({ type: UPDATE_SUCCESSFUL})
    }catch{
        dispatch({ type: UPDATE_FAILED})
    }
    
}

export const getRunningConfig = (device) => async (dispatch) => {
    dispatch({type: SET_LOADING})
    const config = {
        headers: {
            'Authorization': localStorage.getItem('token'),
        }
    }
    try {
        const data = await axios.post('/api/v1/tools/get-running-config', {"ipv4": device.ipv4, "username": device.username, "password": device.password}, config)
        dispatch({type: UPDATE_RUNNING_CFG, payload: data})
    } catch (err) {
        console.log(err)
        dispatch({type: CLEAR_LOADING})
    }

}