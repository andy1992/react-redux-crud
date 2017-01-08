// a reducer takes in 2 things:
// 1. the action (information about what happened)
// 2. copy of current state

//import Constant from './../helpers/constants';
import {
    SELECT_ALL_PRODUCT,
    SELECT_ALL_PRODUCT_FAILED,
    SELECT_ALL_PRODUCT_SUCCESS,
    COUNT_ALL_PRODUCTS,
    COUNT_ALL_PRODUCTS_FAILED,
    COUNT_ALL_PRODUCTS_SUCCESS
} from './../actions/products/actionCreators';

export const INITIAL_STATE = {
    products: []
};

function products(state = INITIAL_STATE, action) {
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
        default:
            return state;
    }
}

export default products;