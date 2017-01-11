import React from 'react';

import { render } from 'react-dom';

// Import Components
import App from './containers/ProductList';
import SingleProduct from './containers/SingleProduct';
import Main from './components/Main';
import CreateProduct from './containers/ProductForm';

// Import react router dependencies
import { Router, Route, IndexRoute, browserHistory }  from 'react-router';

import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Main}>
                <IndexRoute component={App}></IndexRoute>
                <Route path="/view/:productId" component={SingleProduct}></Route>
                <Route path="/product/create" component={CreateProduct}></Route>
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('app'));