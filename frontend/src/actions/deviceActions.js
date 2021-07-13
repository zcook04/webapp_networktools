import axios from 'axios'
import { GET_DEVICES } from "./actions";



// ADDS A NEW DEVICE TO THE DEVICE LIST
export const getDevices = () => async (dispatch) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
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

// RETURNS A SINGLE DEVICE AS AN OBJECT
export const getDeviceInfo = async (device) => {
    const uri = `/api/v1/mydevices/device/${device}`
    const config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    const deviceInfo = await axios(uri, config)

    if(deviceInfo){
        return deviceInfo.data
    }
}