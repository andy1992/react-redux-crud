// All items inside container will bind state and actions into props.
// These props then could be used on the targeted page (for example, in this page, we bind all product actionCreators and
// state to the Main component). Of course you could add custom state or action on the mapStateToProps and mapDispatchToProps methods.

import { connect } from 'react-redux';
import {
    selectAllProduct,
    selectAllProductFailed,
    selectAllProductSuccess,
    countAllProducts,
    countAllProductsFailed,
    countAllProductsSuccess,
    getSelectedProducts
} from '../../actions/productActions';
import ProductGrid from '../../components/products/ProductGrid';

function mapStateToProps(state, ownProps) {
    return {
        products: state.products,
        page: ownProps.location.query.page,
        count: state.count,
        selectedProducts: state.selectedProducts
    };
}

const mapDispatchToProps = (dispatch, props) => {
    // Dispatch action
    return {
        selectAllProduct: (params) => {
            const products = dispatch(selectAllProduct(params));
            products.payload.then((response) => {
                !response.error ?
                    dispatch(selectAllProductSuccess(response.data)) :
                    dispatch(selectAllProductFailed(response.data));
            });
        },
        countAllProducts: (params) => {
            const count = dispatch(countAllProducts(params));
            count.payload.then((response) => {
                !response.error ?
                    dispatch(countAllProductsSuccess(response.data)) :
                    dispatch(countAllProductsFailed(response.data));
            });
        },
        getSelectedProducts: () => {
            const selectedProducts = dispatch(getSelectedProducts());
        }
    }
};

const App = connect(mapStateToProps, mapDispatchToProps)(ProductGrid);

export default App;