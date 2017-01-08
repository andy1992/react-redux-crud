import { createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

//import products from './services/products/getAllProducts';
//import categories from './services/categories/getAllCategories';

import productService from './services/ProductService';
import categoryService from './services/CategoryService';

//const products = productService.getAllProducts();
//console.log(products);
//const categories = categoryService.getAllCategories();

const defaultState = {
    products: [],
    categories: []
};

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const history = syncHistoryWithStore(browserHistory, store);

export default store;