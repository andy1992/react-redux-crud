import userService from './../services/UserService';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

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