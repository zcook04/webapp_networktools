import axios from 'axios'
import { GET_DEVICES } from "./actions";

// ADDS A NEW DEVICE TO THE DEVICE LIST
export const getDevices = () => async (dispatch) => {
    const deviceList = await axios('/api/v1/mydevices')
    if(deviceList) {
        dispatch({type: GET_DEVICES, payload: deviceList.data})
    } else {
        console.log('Error Retrieving Devices')
        return
    }
}