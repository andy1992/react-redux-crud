import ProductForm from '../../components/products/ProductForm';
import { connect } from 'react-redux';
import {
    getAllCategories,
    getAllCategoriesFailed,
    getAllCategoriesSuccess,
} from '../../actions/categoryActions';

import {
    storeProduct,
    storeProductFailed,
    storeProductSuccess,
    findProduct,
    findProductFailed,
    findProductSuccess,
    resetSaveProductStatus
} from '../../actions/productActions';

function mapStateToProps(state, ownProps) {
    let product = {};
    if(state.products.product && state.products.product.length > 0)
        product = state.products.product[0];

    return {
        categories: state.categories.categories,
        successCreation: state.products.response,
        product: product,
        loading: state.products.loading
    };
}

const mapDispatchToProps = (dispatch, props) => {
    // Dispatch action
    return {
        getAllCategories: () => {
            const categories = dispatch(getAllCategories());
            categories.payload.then((response) => {
                !response.error ?
                    dispatch(getAllCategoriesSuccess(response.data)) :
                    dispatch(getAllCategoriesFailed(response.data));
            });
        },
        storeProduct: (values) => {
            const successCreation = dispatch(storeProduct(values));
            successCreation.payload.then((response) => {
                !response.error ?
                    dispatch(storeProductSuccess(response.data)) :
                    dispatch(storeProductFailed(response.data));
            });
        },
        findProduct: (productId) => {
            const product = dispatch(findProduct(productId));
            product.payload.then((response) => {
                !response.error ?
                    dispatch(findProductSuccess(response.data)) :
                    dispatch(findProductFailed(response.data));
            });
        },
        resetStatus: () => {
            dispatch(resetSaveProductStatus());
        }
    }
};

const CreateProductForm = connect(mapStateToProps, mapDispatchToProps)(ProductForm);

export default CreateProductForm;