import authService from '../services/AuthService';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const IS_LOGGED_IN_FAILED = 'IS_LOGGED_IN_FAILED';
export const IS_LOGGED_IN_SUCCESS = 'IS_LOGGED_IN_SUCCESS';

export function login(credentials) {
    const response = authService.authenticate(credentials);
    return {
        type: LOGIN,
        payload: response,
        credentials
    };
}

export function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

export function loginFailed(error) {
    return {
        type: LOGIN_FAILED,
        payload: error
    };
}

export function logout() {
    const response = authService.logout();
    return {
        type: LOGOUT,
        payload: response
    };
}

export function logoutSuccess(response) {
    return {
        type: LOGOUT_SUCCESS,
        response
    };
}

export function logoutFailed(error) {
    return {
        type: LOGOUT_FAILED,
        error
    };
}

export function isLoggedIn() {
    const isLoggedIn = authService.isLoggedIn();
    return {
        type: IS_LOGGED_IN,
        payload: isLoggedIn
    };
}

export function isLoggedInFailed(error) {
    return {
        type: IS_LOGGED_IN_FAILED,
        payload: error
    };
}

export function isLoggedInSuccess(response) {
    return {
        type: IS_LOGGED_IN_SUCCESS,
        payload: response
    };
}