// a reducer takes in 2 things:
// 1. the action (information about what happened)
// 2. copy of current state

//import Constant from './../helpers/constants';
import {
    SELECT_ALL_PRODUCT,
    SELECT_ALL_PRODUCT_FAILED,
    SELECT_ALL_PRODUCT_SUCCESS,
    FIND_PRODUCT,
    FIND_PRODUCT_FAILED,
    FIND_PRODUCT_SUCCESS,
    COUNT_ALL_PRODUCTS,
    COUNT_ALL_PRODUCTS_FAILED,
    COUNT_ALL_PRODUCTS_SUCCESS,
    ADD_SELECTED_PRODUCT,
    REMOVE_SELECTED_PRODUCT,
    GET_SELECTED_PRODUCTS,
    TOGGLE_ALL,
    REMOVE_ALL,
    STORE_PRODUCT,
    STORE_PRODUCT_SUCCESS,
    STORE_PRODUCT_FAILED,
    RESET_SAVE_PRODUCT_STATUS,
    DELETE_PRODUCTS,
    DELETE_PRODUCTS_FAILED,
    DELETE_PRODUCTS_SUCCESS
} from '../actions/productActions';

export const INITIAL_STATE = {
    products: [],
    selectedProducts: [],
    product: {},
    successCreation: false
};

// the name of function will be the state name
export function products(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {
        case SELECT_ALL_PRODUCT:
            return {
                ...state,
                products: [],
                error:null,
                loading:true
            };
        case SELECT_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload,
                error:null,
                loading:false
            };
        case SELECT_ALL_PRODUCT_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                products: [],
                error:error,
                loading: false
            };
        case COUNT_ALL_PRODUCTS:
            return {
                ...state,
                count: 0,
                error: null
            };
        case COUNT_ALL_PRODUCTS_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                count: 0,
                error: error
            };
        case COUNT_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                count: action.payload,
                error:null
            };
        case FIND_PRODUCT:
            return {
                ...state,
                product: {},
                error:null,
                loading: true
            };
        case FIND_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload,
                error:null,
                loading: false
            };
        case FIND_PRODUCT_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                product: {},
                error: error,
                loading: false
            };
        case STORE_PRODUCT:
            return {
                ...state,
                response: false,
                error: null,
                loading: true
            };
        case STORE_PRODUCT_SUCCESS:
            return {
                ...state,
                response: action.payload,
                error: null,
                loading: false
            };
        case STORE_PRODUCT_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                response: false,
                error: error,
                loading: true
            };
        case RESET_SAVE_PRODUCT_STATUS:
            return {
                ...state,
                response: action.payload,
                error: null,
                loading: false
            };
        case DELETE_PRODUCTS:
            return {
                ...state,
                response: null,
                error:null,
                loading: true
            };
        case DELETE_PRODUCTS_SUCCESS:
            return {
                ...state,
                response: action.payload,
                error: null,
                loading: false
            };
        case DELETE_PRODUCTS_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                response: false,
                error: error,
                loading: false
            };
        default:
            return state;
    }
}

export function selectedProducts(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {
        case GET_SELECTED_PRODUCTS:
            return {
                selectedProducts: state.selectedProducts
            };
        case ADD_SELECTED_PRODUCT:
            let newProducts = [];
            if(state.selectedProducts)
                newProducts = state.selectedProducts;
            newProducts.push(action.payload);

            return Object.assign({}, state, {
                selectedProducts: newProducts
            });
        case REMOVE_SELECTED_PRODUCT:
            let i = -1;
            if(state.selectedProducts && state.selectedProducts.length > 0)
                if(state.selectedProducts.includes(action.payload))
                    i = state.selectedProducts.indexOf(action.payload);

            let newSelectedProducts = [];
            for(let x = 0 ; x < state.selectedProducts.length ; x++) {
                if(x != i)
                    newSelectedProducts.push(state.selectedProducts[x]);
            }

            return Object.assign({}, state, {
                selectedProducts: (i >= 0) ? newSelectedProducts : state.selectedProducts
            });
        case TOGGLE_ALL:
            const products = [];
            if(action.payload && action.payload.length > 0)
                for(let i = 0 ; i < action.payload.length ; i++) {
                    products.push(action.payload[i].id);
                }
            return Object.assign({}, state, {
                selectedProducts: products
            });

        case REMOVE_ALL:
            return Object.assign({}, state, {
                selectedProducts: []
            });
        default:
            return state;
    }
}