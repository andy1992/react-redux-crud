import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { selectAllProduct, selectAllProductFailed, selectAllProductSuccess, countAllProducts, countAllProductsFailed, countAllProductsSuccess } from '../../actions/productActions';
import { parseQueryString } from '../../helpers/QueryString';
import {
    DEFAULT_SEARCH,
} from '../../helpers/Pagination';

const SearchBar = (props) =>
{
    const params = {
        order_by: props.order_by,
        order_type: props.order_type,
        item_per_page: props.item_per_page,
        search: props.search,
        page: props.page
    };

    return (
        <div className="input-group col-md-3 margin-bottom-1em pull-left">
            <input
                type="text"
                className="form-control searchbox"
                placeholder="Type a name..."
                required
                id="q"
                defaultValue={props.search}
                onChange={() => props.inputSearchChange(params)} />
            <div className="input-group-btn">
                <button className="btn btn-primary" onClick={() => props.searchProducts(params)}>
                    Search
                </button>
            </div>
        </div>
    );
};

function mapStateToProps(state, props) {
    return {
        order_by: props.order_by,
        order_type: props.order_type,
        item_per_page: props.item_per_page,
        search: props.search,
        page: props.page
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        inputSearchChange: (params) => {
            const search = document.getElementById("q");
            if(search && search.value == '') {
                params.search = DEFAULT_SEARCH;
                params.page = 1;
                const products = dispatch(selectAllProduct(params));
                products.payload.then((response) => {
                    !response.error ?
                        dispatch(selectAllProductSuccess(response.data)) :
                        dispatch(selectAllProductFailed(response.data));
                });

                const count = dispatch(countAllProducts(params));
                count.payload.then((response) => {
                    !response.error ?
                        dispatch(countAllProductsSuccess(response.data)) :
                        dispatch(countAllProductsFailed(response.data));
                });

                const queryString = parseQueryString(params);
                browserHistory.push('/' + queryString);
            }
        },
        searchProducts: (params) => {
            const search = document.getElementById("q");
            const itemPerPage = document.getElementById("item_per_page");

            params.search = search.value;
            params.item_per_page = itemPerPage.value;
            params.page = 1;

            const queryString = parseQueryString(params);
            browserHistory.push('/' + queryString);
            const products = dispatch(selectAllProduct(params));
            products.payload.then((response) => {
                !response.error ?
                    dispatch(selectAllProductSuccess(response.data)) :
                    dispatch(selectAllProductFailed(response.data));
            });

            const count = dispatch(countAllProducts(params));
            count.payload.then((response) => {
                !response.error ?
                    dispatch(countAllProductsSuccess(response.data)) :
                    dispatch(countAllProductsFailed(response.data));
            });
        }
    };
};

const SearchBarComponent = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default SearchBarComponent;