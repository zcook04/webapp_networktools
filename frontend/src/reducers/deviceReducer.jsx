import { GET_DEVICES, RESET_DEVICES, SET_ACTIVE_DEVICE, SET_LOADING, CLEAR_LOADING, GET_RUNNING_CFG_SUCCESS, GET_RUNNING_CFG_FAIL, UPDATE_DEVICE_SUCCESS, UPDATE_DEVICE_FAIL, GET_SHOW_VER_SUCCESS, GET_SHOW_VER_FAIL, GET_SHOW_INT_SUCCESS, GET_SHOW_INT_FAIL, GET_SHOW_VLAN_SUCCESS, GET_SHOW_VLAN_FAIL, GET_SHOW_CDP_SUCCESS, GET_SHOW_CDP_FAIL, GET_SHOW_ROUTE_SUCCESS, GET_SHOW_ROUTE_FAIL, ADD_NEW_DEVICE_FAIL, ADD_NEW_DEVICE_SUCCESS, REMOVE_DEVICE_SUCCESS, REMOVE_DEVICE_FAIL } from '../actions/actions'

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
        case GET_SHOW_INT_SUCCESS:
            const showIntState = {...state}
            showIntState['activeDevice']['interfaceStatus'] = action.payload.data
            return { ...showIntState, 'loading': false}
        case GET_SHOW_INT_FAIL:
            return { ...state, 'loading': false }
        case GET_SHOW_VLAN_SUCCESS:
            const showVlanState = {...state}
            showVlanState['activeDevice']['showVlan'] = action.payload.data
            return { ...showVlanState, 'loading': false}
        case GET_SHOW_VLAN_FAIL:
            return { ...state, 'loading': false }
        case GET_SHOW_CDP_SUCCESS:
            const showCdpState = {...state}
            showCdpState['activeDevice']['showCdp'] = action.payload.data
            return { ...showCdpState, 'loading': false}
        case GET_SHOW_CDP_FAIL:
            return { ...state, 'loading': false }
        case GET_SHOW_ROUTE_SUCCESS:
            const showRouteState = {...state}
            showRouteState['activeDevice']['showRouting'] = action.payload.data
            return { ...showRouteState, 'loading': false}
        case GET_SHOW_ROUTE_FAIL:
            return { ...state, 'loading': false }
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