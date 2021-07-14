import axios from 'axios'
import { 
    CLEAR_LOADING, GET_DEVICES, SET_ACTIVE_DEVICE, SET_LOADING, GET_RUNNING_CFG_SUCCESS, GET_RUNNING_CFG_FAIL, UPDATE_DEVICE_SUCCESS, UPDATE_DEVICE_FAIL, GET_SHOW_VER_FAIL, GET_SHOW_VER_SUCCESS, GET_SHOW_INT_SUCCESS, GET_SHOW_INT_FAIL, GET_SHOW_CDP_SUCCESS, GET_SHOW_CDP_FAIL, GET_SHOW_ROUTE_SUCCESS, GET_SHOW_ROUTE_FAIL, GET_SHOW_VLAN_SUCCESS, GET_SHOW_VLAN_FAIL, ADD_NEW_DEVICE_SUCCESS, ADD_NEW_DEVICE_FAIL
} from "./actions";

const config = {
    headers: {
        'Authorization': localStorage.getItem('token'),
    }
}

export const clearLoading = () => async (dispatch) => {
    dispatch({type: CLEAR_LOADING})
}

export const getDevices = () => async (dispatch) => {
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
    const uri = `/api/v1/mydevices/device/${device.ipv4}`
    const conf = {
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }
    //put updated values and return updated object
    dispatch({type: SET_LOADING})
    try{
        await axios.put(uri, device, conf)
        dispatch({ type: UPDATE_DEVICE_SUCCESS})
        return true
    }catch (err){
        console.log(`Update Device Failed With Error: ${err}`)
        dispatch({ type: UPDATE_DEVICE_FAIL})
        return false
    }
    
}

export const addNewDevice = (device) => async (dispatch) => {
    dispatch({type: SET_LOADING})
    try {
        axios.post(`/api/v1/mydevices/device/${device.ipv4}`, device, config)
        dispatch({type: ADD_NEW_DEVICE_SUCCESS, payload: device})
        return true
    } catch (err) {
        dispatch({type: ADD_NEW_DEVICE_FAIL})
        return false
    }
}

export const getRunningConfig = (device) => async (dispatch) => {
    dispatch({type: SET_LOADING})
    try {
        const data = await axios.post('/api/v1/tools/ios/get-running-config', {"ipv4": device.ipv4, "username": device.username, "password": device.password}, config)
        dispatch({type: GET_RUNNING_CFG_SUCCESS, payload: data})
        return true
    } catch (err) {
        console.log(err)
        dispatch({type: GET_RUNNING_CFG_FAIL})
        return false
    }
}

export const getShowVersion = (device) => async (dispatch) => {
    dispatch({type: SET_LOADING})
    try {
        const data = await axios.post('/api/v1/tools/ios/get-show-version', {"ipv4": device.ipv4, "username": device.username, "password": device.password}, config)
        dispatch({type: GET_SHOW_VER_SUCCESS, payload: data})
        return true
    } catch (err) {
        console.log(err)
        dispatch({type: GET_SHOW_VER_FAIL})
        return false
    }
}

export const getShowInterface = (device) => async (dispatch) => {
    dispatch({type: SET_LOADING})
    try {
        const data = await axios.post('/api/v1/tools/ios/get-show-int-status', {"ipv4": device.ipv4, "username": device.username, "password": device.password}, config)
        dispatch({type: GET_SHOW_INT_SUCCESS, payload: data})
        return true
    } catch (err) {
        console.log(err)
        dispatch({type: GET_SHOW_INT_FAIL})
        return false
    }
}

export const getShowVlans = (device) => async (dispatch) => {
    dispatch({type: SET_LOADING})
    try {
        const data = await axios.post('/api/v1/tools/ios/get-show-vlans', {"ipv4": device.ipv4, "username": device.username, "password": device.password}, config)
        dispatch({type: GET_SHOW_VLAN_SUCCESS, payload: data})
        return true
    } catch (err) {
        console.log(err)
        dispatch({type: GET_SHOW_VLAN_FAIL})
        return false
    }
}

export const getShowCdp = (device) => async (dispatch) => {
    dispatch({type: SET_LOADING})
    try {
        const data = await axios.post('/api/v1/tools/ios/get-show-cdp-neighbors', {"ipv4": device.ipv4, "username": device.username, "password": device.password}, config)
        dispatch({type: GET_SHOW_CDP_SUCCESS, payload: data})
        return true
    } catch (err) {
        console.log(err)
        dispatch({type: GET_SHOW_CDP_FAIL})
        return false
    }
}

export const getShowRouting = (device) => async (dispatch) => {
    dispatch({type: SET_LOADING})
    try {
        const data = await axios.post('/api/v1/tools/ios/get-show-ip-route', {"ipv4": device.ipv4, "username": device.username, "password": device.password}, config)
        dispatch({type: GET_SHOW_ROUTE_SUCCESS, payload: data})
        return true
    } catch (err) {
        console.log(err)
        dispatch({type: GET_SHOW_ROUTE_FAIL})
        return false
    }
}