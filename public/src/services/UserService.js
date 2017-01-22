import axios from 'axios';
import { API_ENDPOINT } from './../helpers/Constant';

export default class UserService
{
    static register(values) {
        const url = '/register.php';
        const query = 'email=' + values.email + '&password=' + values.password + '&password_confirmation=' + values.password_confirmation;
        return axios.post(API_ENDPOINT + url, query, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }

    static updatePassword(values) {
        const url = '/update-password.php';
        const query = 'old_password=' + values.old_password + '&password=' + values.password + '&password_confirmation=' + values.password_confirmation + '&id=' + values.id;
        return axios.post(API_ENDPOINT + url, query, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
}