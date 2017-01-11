import axios from 'axios';
import { API_ENDPOINT } from './../helpers/Constant';

export default class CategoryService
{
    static getAllCategories()
    {
        return axios({
            method: 'get',
            url: API_ENDPOINT + '/read_all_categories.php',
            header: []
        });
    }
}