import {
    REGISTER,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_FAILED,
    UPDATE_PASSWORD_SUCCESS
} from './../actions/userActions';

const INITIAL_STATE = {
    response: '',
    loading: false,
    error: null
};

export function register(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {
        case REGISTER:
            return {
                ...state,
                response: null,
                loading: true,
                error: null
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false,
                error: null
            };
        case REGISTER_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                response: null,
                loading: false,
                error: error
            };
        default:
            return state;
    }
}

export function updatePassword(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {
        case UPDATE_PASSWORD:
            return {
                ...state,
                response: null,
                loading: true,
                error: null
            };
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                response: action.payload,
                loading: false,
                error: null
            };
        case UPDATE_PASSWORD_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                response: null,
                loading: false,
                error: error
            };
        default:
            return state;
    }
}