import { GET_DEVICES, SET_ACTIVE_DEVICE, SET_LOADING, CLEAR_LOADING, UPDATE_RUNNING_CFG } from '../actions/actions'

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
        case UPDATE_RUNNING_CFG:
            const currentState = {...state}
            currentState['activeDevice']['runningConfig'] = action.payload
            return { ...currentState, 'loading': false}
        default:
            return state;
    }
}

export default deviceReducer;