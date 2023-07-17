import {
    AUTHENTICATE_USER,
    AUTHENTICATE_USER_SUCCESS,
    AUTHENTICATE_USER_ERROR,
    SIGNOUT_USER
} from '../types' 

const initialState = {
    auth: {},
    loading: false,
    error: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case AUTHENTICATE_USER:
            return {
                ...state,
                loading: action.payload
            }
        case AUTHENTICATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                auth: action.payload
            }
        case AUTHENTICATE_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SIGNOUT_USER:
            return {
                ...state,
                auth: {}
            }
        default:
            return state
    }
}