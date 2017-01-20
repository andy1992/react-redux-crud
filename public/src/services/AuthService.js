import jsonp from 'jsonp-promise';
import {
    API_ENDPOINT
} from './../helpers/Constant';

export default class AuthService
{
    static authenticate(credentials) {
        const url = '/login.php';
        const callbackName = 'callback';
        const query = '&email=' + credentials.email + '&password=' + credentials.password;
        const callback = '?callback=' + callbackName;
        // Use JSONP to easily bypass CORS in session-related transactions (don't try this at home, it is for development purpose only)
        let response = jsonp(API_ENDPOINT + url + callback + query, {});
        return response.promise;
    }

    static logout() {
        const url = '/logout.php';
        let response = jsonp(API_ENDPOINT + url, {});
        return response.promise;
    }

    static isLoggedIn() {
        const url = '/is_logged_in.php';
        const callbackName = 'callback';
        const callback = '?callback=' + callbackName;
        // Use JSONP to easily bypass CORS in session-related transactions (don't try this at home, it is for development purpose only)
        let response = jsonp(API_ENDPOINT + url, {});
        return response.promise;
    }
}