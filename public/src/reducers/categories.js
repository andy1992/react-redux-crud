// a reducer takes in 2 things:
// 1. the action (information about what happened)
// 2. copy of current state

//import Constant from './../helpers/constants';

import {
    GET_ALL_CATEGORIES,
    GET_ALL_CATEGORIES_FAILED,
    GET_ALL_CATEGORIES_SUCCESS
} from '../actions/categoryActions';

const INITIAL_STATE = {
    categories: []
};

function categories(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: [],
                loading: true,
                error: null
            };
        case GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null
            };
        case GET_ALL_CATEGORIES_FAILED:
            error = action.payload || {message: action.payload.message};
            return {
                ...state,
                categories: [],
                error: error,
                loading: false
            };
        default:
            return state;
    }
}

export default categories;