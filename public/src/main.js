import React from 'react';

import { render } from 'react-dom';

// Import Components
import App from './containers/ProductList';
import SingleProduct from './components/products/SingleProduct';
import ProductGrid from './components/products/ProductGrid';

// Import react router dependencies
import { Router, Route, IndexRoute, browserHistory }  from 'react-router';

import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={ProductGrid}></IndexRoute>
                <Route path="/view/:postId" component={SingleProduct}></Route>
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('app'));