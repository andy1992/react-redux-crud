import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { products, selectedProducts } from '../reducers/products';
import categories from '../reducers/categories';

const rootReducer = combineReducers({
    products,
    selectedProducts,
    categories,
    routing: routerReducer
});

export default rootReducer;