import React from 'react';
import ProductRow from '../../components/products/ProductRow';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
    selectAllProduct,
    selectAllProductFailed,
    selectAllProductSuccess,
    addSelectedProduct,
    removeSelectedProduct,
    toggleAll,
    removeAll,
    deleteProducts,
    deleteProductsFailed,
    deleteProductsSuccess,
    countAllProducts,
    countAllProductsFailed,
    countAllProductsSuccess,
} from '../../actions/productActions';
import { parseQueryString } from '../../helpers/QueryString';
import {
    ORDER_TYPE_ASC,
    ORDER_TYPE_DESC
} from '../../helpers/Pagination';

const ProductTable = props =>
{
    const params = {
        item_per_page: props.item_per_page,
        order_by: props.order_by,
        order_type: props.order_type,
        page: props.page,
        search: props.search
    };

    const rows = props.products.map(function(product, i) {
        let checked = false;
        if(props.selectedProducts) {
            if(props.selectedProducts.length > 0) {
                if(props.selectedProducts.includes(product.id)) {
                    checked = true;
                }
            }
        }
        return (
            <ProductRow
                isLoggedIn={props.isLoggedIn}
                user={props.user}
                key={i}
                product={product}
                selectedProducts={props.selectedProducts}
                checked={checked}
                addSelectedProduct={props.addSelectedProduct}
                removeSelectedProduct={props.removeSelectedProduct}
                deleteSelected={props.deleteSelected}
            />
        );
    }.bind(this));

    const selectedProducts = [];

    return (
        !rows.length
            ? <div className="alert alert-danger" style={{marginTop:70}}>No products found.</div>
            :
            <table className="table table-bordered table-hover">
                <thead>
                <tr>
                    {
                        (props.isLoggedIn)
                            ?
                            <th className="text-center" style={{width:'1.5%'}}>
                                <input type="checkbox" id="selectAll" onClick={() => props.toggleAll()} />
                            </th>
                            : null
                    }
                    <th style={{width:'20%'}}>
                        <Link
                            onClick={() => props.sortChanged(params, 'name')}
                        >
                            Name
                            <i className={"fa fa-fw " + ((params.order_by == 'name') ? ("fa-sort-" + props.order_type) : "fa-sort")} />
                        </Link>
                    </th>
                    <th style={{width:'40%'}}>
                        <Link
                            onClick={() => props.sortChanged(params, 'description')}
                        >
                            Description
                            <i className={"fa fa-fw " + ((params.order_by == 'description') ? ("fa-sort-" + props.order_type) : "fa-sort")} />
                        </Link>
                    </th>
                    <th style={{width:'9%'}}>
                        <Link
                            onClick={() => props.sortChanged(params, 'price')}
                        >
                            Price
                            <i className={"fa fa-fw " + ((params.order_by == 'price') ? ("fa-sort-" + props.order_type) : "fa-sort")} />
                        </Link>
                    </th>
                    <th style={{width:'9%'}}>
                        <Link
                            onClick={() => props.sortChanged(params, 'category_name')}
                        >
                            Category
                            <i className={"fa fa-fw " + ((params.order_by == 'category_name') ? ("fa-sort-" + props.order_type) : "fa-sort")} />
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
    };
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
        },
        toggleAll: () => {
            const checkbox = document.getElementById('selectAll');
            if(checkbox.checked)
                dispatch(toggleAll(props.products));
            else
                dispatch(removeAll());
        },
        addSelectedProduct: (id) => {
            dispatch(addSelectedProduct(id));
        },
        removeSelectedProduct: (id) => {
            dispatch(removeSelectedProduct(id));
        },
        deleteSelected: (selectedProducts) => {
            if(selectedProducts.length > 0) {
                const r = confirm("Are you sure you want to delete the selected product?");
                if(r) {
                    const response = dispatch(deleteProducts(selectedProducts));
                    response.payload.then((response) => {
                        if (!response.error) {
                            dispatch(deleteProductsSuccess(response.data));

                            const params = {};
                            // Reload all products
                            const products = dispatch(selectAllProduct(params));
                            products.payload.then((response) => {
                                !response.error ?
                                    dispatch(selectAllProductSuccess(response.data)) :
                                    dispatch(selectAllProductFailed(response.data));
                            });

                            // Recount all products
                            const count = dispatch(countAllProducts(params));
                            count.payload.then((response) => {
                                !response.error ?
                                    dispatch(countAllProductsSuccess(response.data)) :
                                    dispatch(countAllProductsFailed(response.data));
                            });
                        } else
                            dispatch(deleteProductsFailed(response.data));
                    });
                }
            } else {
                alert('Please select a product to be deleted.');
            }
        }
    };
};

const ProductTableComponent = connect(mapStateToProps, mapDispatchToProps)(ProductTable);

export default ProductTableComponent;