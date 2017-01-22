import userService from './../services/UserService';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILED = 'UPDATE_PASSWORD_FAILED';

export function register(values) {
    const response = userService.register(values);
    return {
        type: REGISTER,
        payload: response,
        values
    };
}

export function registerSuccess(response) {
    return {
        type: REGISTER_SUCCESS,
        payload:response
    };
}

export function registerFailed(error) {
    return {
        type: REGISTER_FAILED,
        payload: error
    };
}

export function updatePassword(values) {
    const response = userService.updatePassword(values);
    return {
        type: UPDATE_PASSWORD,
        payload: response,
        values
    };
}

export function updatePasswordSuccess(response) {
    return {
        type: UPDATE_PASSWORD_SUCCESS,
        payload: response
    };
}

export function updatePasswordFailed(error) {
    return {
        type: UPDATE_PASSWORD_FAILED,
        payload: error
    };
}