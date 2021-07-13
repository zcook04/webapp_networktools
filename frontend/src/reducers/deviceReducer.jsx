import { GET_DEVICES, SET_ACTIVE_DEVICE, SET_LOADING, CLEAR_LOADING } from '../actions/actions'

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
            return { ...state, 'DeviceList': action.payload, 'loading': false }
        case SET_ACTIVE_DEVICE:
            return { ...state, 'ActiveDevice': action.payload, 'loading': false}
        default:
            return state;
    }
}

export default deviceReducer;