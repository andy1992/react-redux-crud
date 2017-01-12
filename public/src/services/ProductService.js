import { API_ENDPOINT } from './../helpers/Constant';
import axios from 'axios';
import { parseQueryString } from './../helpers/QueryString';
import querystring from 'querystring';

export default class ProductService
{

    static getAllProducts(parameters = {})
    {
        const queryString = parseQueryString(parameters);
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

    static getProductById(id)
    {
        return axios.post(API_ENDPOINT + '/read_one_product.php', 'prod_id=' + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }

    static storeProduct(values)
    {
        let url = '/create_product.php';
        let query = 'name=' + values.name + '&price=' + values.price + '&description=' + values.description + '&category_id=' + values.category_id;
        if(values.id != null) {
            url = '/update_product.php';
            query += '&id=' + values.id;
        }
        return axios.post(API_ENDPOINT + url, query, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }

    static deleteProducts(selectedProducts)
    {
        let url = '/delete_products.php';

        let query = '';
        for(let i = 0 ; i < selectedProducts.length ; i++) {
            query += 'del_ids[]=' + selectedProducts[i] + '&';
        }

        return axios.post(API_ENDPOINT + url, query, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

    }
}