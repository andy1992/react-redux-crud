import SingleProduct from '../../components/products/SingleProduct';
import { connect } from 'react-redux';
import {
    findProduct,
    findProductFailed,
    findProductSuccess
} from '../../actions/productActions';

function mapStateToProps(state, ownProps) {
    let product = {};
    if(state.products.product && state.products.product.length > 0)
        product = state.products.product[0];
    return {
        product: product,
        loading: state.products.loading
    };
}

const mapDispatchToProps = (dispatch, props) => {
    // Dispatch action
    return {
        findProduct: (productId) => {
            const product = dispatch(findProduct(productId));
            product.payload.then((response) => {
                !response.error ?
                    dispatch(findProductSuccess(response.data)) :
                    dispatch(findProductFailed(response.data));
            });
        }
    }
};

const SingleProductComponent = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

export default SingleProductComponent;