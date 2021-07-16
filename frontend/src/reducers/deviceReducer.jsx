import { GET_DEVICES, RESET_DEVICES, SET_ACTIVE_DEVICE, SET_LOADING, CLEAR_LOADING, GET_RUNNING_CFG_SUCCESS, GET_RUNNING_CFG_FAIL, UPDATE_DEVICE_SUCCESS, UPDATE_DEVICE_FAIL, GET_SHOW_VER_SUCCESS, GET_SHOW_VER_FAIL, GET_SHOW_INT_SUCCESS, GET_SHOW_INT_FAIL, GET_SHOW_VLAN_SUCCESS, GET_SHOW_VLAN_FAIL, GET_SHOW_CDP_SUCCESS, GET_SHOW_CDP_FAIL, GET_SHOW_ROUTE_SUCCESS, GET_SHOW_ROUTE_FAIL, ADD_NEW_DEVICE_FAIL, ADD_NEW_DEVICE_SUCCESS, REMOVE_DEVICE_SUCCESS, REMOVE_DEVICE_FAIL } from '../actions/actions'

const initialState = {
    'loading': false,
    'deviceList': [],
    'activeDevice': {}
}

const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.payload || true }
        case CLEAR_LOADING:
            return { ...state, loading: false}
        case GET_DEVICES:
            return { ...state, 'deviceList': action.payload, 'loading': false }
        case RESET_DEVICES:
            return { ...state,     'loading': false,
            'deviceList': [],
            'activeDevice': {}}
        case SET_ACTIVE_DEVICE:
            return { ...state, 'activeDevice': action.payload, 'loading': false}
        case UPDATE_DEVICE_SUCCESS:
            return { ...state, 'loading': false }
        case UPDATE_DEVICE_FAIL:
            return { ...state, 'loading': false }
        case GET_RUNNING_CFG_SUCCESS:
            return { ...state, activeDevice: { ...state.activeDevice, runningConfig: action.payload.data }}
        case GET_RUNNING_CFG_FAIL:
            return { ...state, }
        case GET_SHOW_VER_SUCCESS:
            return { ...state, activeDevice: { ...state.activeDevice, showVersion: action.payload.data }}
        case GET_SHOW_VER_FAIL:
            return { ...state }
        case GET_SHOW_INT_SUCCESS:
            return { ...state, activeDevice: { ...state.activeDevice, interfaceStatus: action.payload.data }}
        case GET_SHOW_INT_FAIL:
            return { ...state }
        case GET_SHOW_VLAN_SUCCESS:
            return { ...state, activeDevice: { ...state.activeDevice, showVlan: action.payload.data }}
        case GET_SHOW_VLAN_FAIL:
            return { ...state }
        case GET_SHOW_CDP_SUCCESS:
            return { ...state, activeDevice: { ...state.activeDevice, showCdp: action.payload.data }}
        case GET_SHOW_CDP_FAIL:
            return { ...state }
        case GET_SHOW_ROUTE_SUCCESS:
            return { ...state, activeDevice: { ...state.activeDevice, showRouting: action.payload.data }}
        case GET_SHOW_ROUTE_FAIL:
            return { ...state }
        case ADD_NEW_DEVICE_SUCCESS:
            return { ...state, 'loading': false, deviceList: [...state.deviceList, action.payload] }
        case ADD_NEW_DEVICE_FAIL:
            return { ...state, 'loading': false }
        case REMOVE_DEVICE_SUCCESS:
            return { ...state, 'loading': false, deviceList: [
                    ...state.deviceList.slice(0, action.payload),
                    ...state.deviceList.slice(action.payload + 1) ]}
        case REMOVE_DEVICE_FAIL:
            return { ...state, 'loading': false }
        default:
            return state;
    }
}

export default deviceReducer;