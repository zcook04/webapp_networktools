import { GET_DEVICES, SET_ACTIVE_DEVICE, SET_LOADING, CLEAR_LOADING, GET_RUNNING_CFG_SUCCESS, GET_RUNNING_CFG_FAIL, UPDATE_DEVICE_SUCCESS, UPDATE_DEVICE_FAIL, GET_SHOW_VER_SUCCESS, GET_SHOW_VER_FAIL } from '../actions/actions'

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
        case UPDATE_DEVICE_SUCCESS:
            return { ...state, 'loading': false }
        case UPDATE_DEVICE_FAIL:
            return { ...state, 'loading': false }
        case GET_RUNNING_CFG_SUCCESS:
            const runConfState = {...state}
            runConfState['activeDevice']['runningConfig'] = action.payload.data
            return { ...runConfState, 'loading': false}
        case GET_RUNNING_CFG_FAIL:
            return { ...state, 'loading': false}
        case GET_SHOW_VER_SUCCESS:
            const showVerState = {...state}
            showVerState['activeDevice']['showVersion'] = action.payload.data
            return { ...showVerState, 'loading': false}
        case GET_SHOW_VER_FAIL:
            return { ...state, 'loading': false }
        default:
            return state;
    }
}

export default deviceReducer;