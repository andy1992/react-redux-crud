import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import products from '../reducers/products';
import categories from '../reducers/categories';

const rootReducer = combineReducers({
    products,
    categories,
    routing: routerReducer
});

export default rootReducer;