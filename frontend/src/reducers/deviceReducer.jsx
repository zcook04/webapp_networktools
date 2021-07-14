import { GET_DEVICES, SET_ACTIVE_DEVICE, SET_LOADING, CLEAR_LOADING, GET_RUNNING_CFG_SUCCESS, GET_RUNNING_CFG_FAIL, UPDATE_DEVICE_SUCCESS, UPDATE_DEVICE_FAIL } from '../actions/actions'

const initialState = {
    'loading': false,
    'deviceList': [],
    'activeDevice': {}
}

const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: true}
        case CLEAR_LOADING:
            return { ...state, loading: false}
        case GET_DEVICES:
            return { ...state, 'deviceList': action.payload, 'loading': false }
        case SET_ACTIVE_DEVICE:
            return { ...state, 'activeDevice': action.payload, 'loading': false}
        case GET_RUNNING_CFG_SUCCESS:
            const currentState = {...state}
            currentState['activeDevice']['runningConfig'] = action.payload.data
            return { ...currentState, 'loading': false}
        case GET_RUNNING_CFG_FAIL:
            return { ...state, 'loading': false}
        case UPDATE_DEVICE_SUCCESS:
            return { ...state, 'loading': false }
        case UPDATE_DEVICE_FAIL:
            return { ...state, 'loading': false }
        default:
            return state;
    }
}

export default deviceReducer;