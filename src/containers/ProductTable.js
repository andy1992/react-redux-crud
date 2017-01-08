import React from 'react';
import ProductRow from './../components/products/ProductRow';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { selectAllProduct, selectAllProductFailed, selectAllProductSuccess, countAllProducts, countAllProductsFailed, countAllProductsSuccess } from '../actions/products/actionCreators';
import { parseQueryString } from './../helpers/QueryString';
import {
    ORDER_TYPE_ASC,
    ORDER_TYPE_DESC
} from './../helpers/Pagination';

const ProductTable = (props) =>
{
    const rows = props.products.map(function(product, i) {
        return (
            <ProductRow
                key={i}
                product={product}
            />
        );
    }.bind(this));

    return (
        !rows.length
            ? <div className="alert alert-danger" style={{marginTop:70}}>No products found.</div>
            :
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    <th className="text-center" style={{width:'1.5%'}}>
                        <input type="checkbox"/>
                    </th>
                    <th style={{width:'20%'}}>
                        <Link
                            onClick={() => props.sortChanged('name', props.params)}
                            className={"fa fa-fw " + ((props.params.order_by == 'name') ? ("fa-sort-" + props.orderType) : "fa-sort")}>
                        Name
                        </Link>
                    </th>
                    <th style={{width:'40%'}}>
                        Description
                    </th>
                    <th style={{width:'9%'}}>
                        Price
                    </th>
                    <th style={{width:'9%'}}>
                        Category
                    </th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
    );
};
function mapStateToProps(state, props) {
    const params = {
        order_by: props.orderBy,
        order_type: props.orderType,
        item_per_page: props.productsPerPage,
        search: props.search,
        page: props.currentPage
    };
    return {
        params: params
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        sortChanged: (orderBy, params) => {
            params.order_by = orderBy;
            params.order_type = props.order_type == ORDER_TYPE_ASC ? ORDER_TYPE_DESC : ORDER_TYPE_ASC;

            console.log(params);
            const queryString = parseQueryString(params);

            browserHistory.push('/' + queryString);

            const products = dispatch(selectAllProduct(params));
            products.payload.then((response) => {
                !response.error ?
                    dispatch(selectAllProductSuccess(response.data)) :
                    dispatch(selectAllProductFailed(response.data));
            });
        }
    };
};

const ProductTableComponent = connect(mapStateToProps, mapDispatchToProps)(ProductTable);

export default ProductTableComponent;