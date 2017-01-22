import React from 'react';

import { render } from 'react-dom';

// Import Components
import App from './containers/products/ProductList';
import SingleProduct from './containers/products/SingleProduct';
import Main from './containers/Main';
import ProductForm from './containers/products/ProductForm';
import LoginForm from './containers/auth/Login';
import RegistrationForm from './containers/user/Register';
import GenericNotFound from './components/layouts/GenericNotFound';
import ChangePasswordForm from './containers/user/ChangePassword';

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
                <Route path="/product/create" component={ProductForm}></Route>
                <Route path="/product/edit/:productId" component={ProductForm}></Route>
                <Route path="/login" component={LoginForm}></Route>
                <Route path="/register" component={RegistrationForm}></Route>
                <Route path="/change-password" component={ChangePasswordForm}></Route>
                <Route path='*' component={GenericNotFound} />
            </Route>
        </Router>
    </Provider>
);

render(router, document.getElementById('app'));