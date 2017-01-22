import React from 'react';
import TopActions from '../../components/products/TopActions';
import { connect } from 'react-redux';
import {
    deleteProducts,
    deleteProductsFailed,
    deleteProductsSuccess,
    selectAllProduct,
    selectAllProductFailed,
    selectAllProductSuccess,
    countAllProducts,
    countAllProductsFailed,
    countAllProductsSuccess,
    removeAll
} from '../../actions/productActions';

function mapStateToProps(state, props) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSelected: (selectedProducts) => {
            if(selectedProducts && selectedProducts.length > 0) {
                const r = confirm("Are you sure you want to delete the selected product(s)?");
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

                            dispatch(removeAll());
                        } else
                            dispatch(deleteProductsFailed(response.data));
                    });
                }
            } else {
                alert('Please select one or more products to be deleted.');
            }
        }
    };
};

const TopActionsComponent = connect(mapStateToProps, mapDispatchToProps)(TopActions);

export default TopActionsComponent;