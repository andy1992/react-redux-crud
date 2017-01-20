import {
    LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    IS_LOGGED_IN,
    IS_LOGGED_IN_FAILED,
    IS_LOGGED_IN_SUCCESS
} from '../actions/authActions';

const INITIAL_STATE = {
    user: {},
    isLoggedIn: false
};

export default function auth(state = INITIAL_STATE, action) {
    let error = '';
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                user: {},
                error: null,
                loading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
                loading: false
            };
        case LOGIN_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                user: null,
                error: error,
                loading: false
            };
        case LOGOUT:
            return {
                ...state,
                response: null,
                error: null,
                loading: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                response: action.payload,
                error: null,
                loading: false
            };
        case LOGOUT_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                response: null,
                error: error,
                loading: false
            };
        case IS_LOGGED_IN:
            return {
                ...state,
                user: null,
                isLoggedIn: false,
                error: null,
                loading: true
            };
        case IS_LOGGED_IN_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                user: null,
                isLoggedIn: false,
                error: error,
                loading: false
            };
        case IS_LOGGED_IN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: action.payload.message == 'true',
                error: null,
                loading: false
            };
        default:
            return state;
    }
}