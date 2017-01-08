import { API_ENDPOINT } from './../helpers/Constant';
import axios from 'axios';
import { parseQueryString } from './../helpers/QueryString';

export default class ProductService
{

    static getAllProducts(parameters = {})
    {
        const queryString = parseQueryString(parameters);
        console.log(parameters);
        return axios({
            method: 'get',
            url: API_ENDPOINT + '/read_all_products.php' + queryString,
            header: []
        });
    }

    static countAllProducts(parameters = {})
    {
        const queryString = parseQueryString(parameters);
        return axios({
            method: 'get',
            url: API_ENDPOINT + '/count_all_products.php' + queryString,
            header: []
        });
    }

    static paginateProducts(parameters = {})
    {
        const queryString = parseQueryString(parameters);
        return fetch(API_ENDPOINT + '/read_all_products.php' + queryString)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            });
    }

    static getFirstProduct(parameters = {})
    {
        const queryString = parseQueryString(parameters);
        return fetch(API_ENDPOINT + '/read_one_product.php' + queryString)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                console.log(response.json());
                return response.json();
            });
    }
}