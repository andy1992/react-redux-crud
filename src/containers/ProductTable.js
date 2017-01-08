import React from 'react';
import ProductRow from './../components/products/ProductRow';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { selectAllProduct, selectAllProductFailed, selectAllProductSuccess } from '../actions/products/actionCreators';
import { parseQueryString } from './../helpers/QueryString';
import {
    ORDER_TYPE_ASC,
    ORDER_TYPE_DESC
} from './../helpers/Pagination';

const ProductTable = props =>
{
    const params = {
        item_per_page: props.productsPerPage,
        order_by: props.orderBy,
        order_type: props.orderType,
        page: props.currentPage,
        search: props.search
    };
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
                            onClick={() => props.sortChanged(params, 'name')}
                        >
                            <i className={"fa fa-fw " + ((params.order_by == 'name') ? ("fa-sort-" + props.orderType) : "fa-sort")}>
                                Name
                            </i>
                        </Link>
                    </th>
                    <th style={{width:'40%'}}>
                        <Link
                            onClick={() => props.sortChanged(params, 'description')}
                        >
                            <i className={"fa fa-fw " + ((params.order_by == 'description') ? ("fa-sort-" + props.orderType) : "fa-sort")}>
                                Description
                            </i>
                        </Link>
                    </th>
                    <th style={{width:'9%'}}>
                        <Link
                            onClick={() => props.sortChanged(params, 'price')}
                        >
                            <i className={"fa fa-fw " + ((params.order_by == 'price') ? ("fa-sort-" + props.orderType) : "fa-sort")}>
                                Price
                            </i>
                        </Link>
                    </th>
                    <th style={{width:'9%'}}>
                        <Link
                            onClick={() => props.sortChanged(params, 'category_name')}
                        >
                            <i className={"fa fa-fw " + ((params.order_by == 'category_name') ? ("fa-sort-" + props.orderType) : "fa-sort")}>
                                Category
                            </i>
                        </Link>
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
        sortChanged: (params, orderBy) => {
            params.order_by = orderBy;
            params.order_type = params.order_type == ORDER_TYPE_ASC ? ORDER_TYPE_DESC : ORDER_TYPE_ASC;

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