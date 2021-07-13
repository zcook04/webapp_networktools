import { GET_DEVICES, SET_ACTIVE_DEVICE } from '../actions/actions'

const initialState = {
    'Loading': false,
    'DeviceList': [],
    'ActiveDevice': {}
}

const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEVICES:
            return { ...state, 'DeviceList': action.payload }
        case SET_ACTIVE_DEVICE:
            return { ...state, 'ActiveDevice': action.payload}
        default:
            return state;
    }
}

export default deviceReducer;