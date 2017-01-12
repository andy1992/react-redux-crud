import productService from './../../services/ProductService';

export const STORE_PRODUCT = 'STORE_PRODUCT';
export const STORE_PRODUCT_SUCCESS = 'STORE_PRODUCT_SUCCESS';
export const STORE_PRODUCT_FAILED = 'STORE_PRODUCT_FAILED';

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
export const FIND_PRODUCT_SUCCESS = 'FIND_PRODUCT_SUCCESS';
export const FIND_PRODUCT_FAILED = 'FIND_PRODUCT_FAILED';
export const GET_FIRST_PRODUCT = 'GET_FIRST_PRODUCT';

export const TOGGLE_ALL = 'TOGGLE_ALL';
export const REMOVE_ALL = 'REMOVE_ALL';
export const GET_SELECTED_PRODUCTS = 'GET_SELECTED_PRODUCTS';
export const ADD_SELECTED_PRODUCT = 'ADD_SELECTED_PRODUCT';
export const REMOVE_SELECTED_PRODUCT = 'REMOVE_SELECTED_PRODUCT';

export const RESET_SAVE_PRODUCT_STATUS = 'RESET_SAVE_PRODUCT_STATUS';

export function toggleAll(products) {
    return {
        type: TOGGLE_ALL,
        payload: products
    }
}

export function removeAll() {
    return {
        type: REMOVE_ALL
    }
}

export function getSelectedProducts() {
    return {
        type: GET_SELECTED_PRODUCTS
    }
}

export function addSelectedProduct(id) {
    console.log('Selecting product with ID : ' + id);
    return {
        type: ADD_SELECTED_PRODUCT,
        payload: id
    }
}

export function removeSelectedProduct(id) {
    console.log('Removing product with ID : ' + id);
    return {
        type: REMOVE_SELECTED_PRODUCT,
        payload: id
    }
}

export function storeProduct(values) {
    const responseText = productService.storeProduct(values);
    return {
        type: STORE_PRODUCT,
        payload: responseText,
        values
    };
}

export function storeProductSuccess(responseText) {
    return {
        type: STORE_PRODUCT_SUCCESS,
        payload: responseText
    };
}

export function storeProductFailed(error) {
    return {
        type: STORE_PRODUCT_SUCCESS,
        payload: error
    };
}

export function resetSaveProductStatus() {
    return {
        type: RESET_SAVE_PRODUCT_STATUS,
        payload: null
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

export function selectAllProduct(params) {
    const products = productService.getAllProducts(params);

    return {
        type: SELECT_ALL_PRODUCT,
        payload: products,
        params
    };
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
    const product = productService.getProductById(productId);
    return {
        type: FIND_PRODUCT,
        payload: product,
        productId
    };
}

export function findProductSuccess(product) {
    return {
        type: FIND_PRODUCT_SUCCESS,
        payload: product
    };
}

export function findProductFailed(error) {
    return {
        type: FIND_PRODUCT_FAILED,
        payload: error
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