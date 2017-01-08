import axios from 'axios';
import { API_ENDPOINT } from './../../helpers/Constant';
import { parseQueryString } from './../../helpers/QueryString';
import productService from './../../services/ProductService';

export const STORE_PRODUCT = 'STORE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const SELECT_ALL_PRODUCT = 'SELECT_ALL_PRODUCT';
export const SELECT_ALL_PRODUCT_SUCCESS = 'SELECT_ALL_PRODUCT_SUCCESS';
export const SELECT_ALL_PRODUCT_FAILED = 'SELECT_ALL_PRODUCT_FAILED';

export const COUNT_ALL_PRODUCTS = 'COUNT_ALL_PRODUCTS';
export const COUNT_ALL_PRODUCTS_SUCCESS = 'COUNT_ALL_PRODUCTS_SUCCESS';
export const COUNT_ALL_PRODUCTS_FAILED = 'COUNT_ALL_PRODUCTS_FAILED';

export const PAGINATE_PRODUCT = 'PAGINATE_PRODUCT';
export const FIND_PRODUCT = 'FIND_PRODUCT';
export const GET_FIRST_PRODUCT = 'GET_FIRST_PRODUCT';

export function addProduct(categoryId, product_name) {
    console.log('Adding product');
    return {
        type: STORE_PRODUCT,
        categoryId,
        product_name
    };
}

export function deleteProduct(productId) {
    console.log('Deleting product with ID: ' + productId);
    return {
        type: DELETE_PRODUCT,
        productId,
    };
}

export function updateProduct(productId, categoryId, product_name) {
    console.log('Updating product with ID: ' + productId);
    return {
        type: UPDATE_PRODUCT,
        categoryId,
        product_name,
        productId
    };
}

export function selectAllProduct(params) {
    //const products = productService.getAllProducts(params);
    //console.log(params);
    const queryString = parseQueryString(params);
    const products = axios({
        method: 'get',
        url: API_ENDPOINT + '/read_all_products.php' + queryString,
        header: []
    });

    return {
        type: SELECT_ALL_PRODUCT,
        payload: products,
        params
    };
}

export function paginateProduct(params) {
    console.log('Paginate product with params: ' + params);
    return {
        type: PAGINATE_PRODUCT,
        params
    };
}

export function countAllProducts(params) {
    return {
        type: COUNT_ALL_PRODUCTS,
        payload: productService.countAllProducts(params)
    }
}

export function countAllProductsSuccess(count) {
    return {
        type: COUNT_ALL_PRODUCTS_SUCCESS,
        payload: count
    }
}

export function countAllProductsFailed(error) {
    return {
        type: COUNT_ALL_PRODUCTS_FAILED,
        payload: error
    }
}

export function selectAllProductSuccess(products) {
    return {
        type: SELECT_ALL_PRODUCT_SUCCESS,
        payload: products
    };
}

export function selectAllProductFailed(error) {
    return {
        type: SELECT_ALL_PRODUCT_FAILED,
        payload: error
    };
}

export function findProduct(productId) {
    console.log('Finding product with ID: ' + productId);
    return {
        type: FIND_PRODUCT,
        productId
    };
}

export function getFirstProduct(params) {
    console.log('Finding first product with ID: ' + params);
    return {
        type: GET_FIRST_PRODUCT,
        params,
        product: productService.getFirstProduct(params)
    };
}