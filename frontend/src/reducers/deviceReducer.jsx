import {GET_DEVICES} from '../actions/actions'

const initialState = {
    'Loading': false,
    'Devices': {}
}

const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEVICES:
            return {...state, 'devices': action.payload}
        default:
            return state;
    }
}

export default deviceReducer;