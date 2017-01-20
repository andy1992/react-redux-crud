import userService from './../services/UserService';

export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function register(values) {
    const response = userService.register(values);
    return {
        payload: response,
        values
    };
}