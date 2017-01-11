import CreateForm from './../components/products/Create';
import { connect } from 'react-redux';
import {
    getAllCategories,
    getAllCategoriesFailed,
    getAllCategoriesSuccess
} from '../actions/categories/actionCreators';

function mapStateToProps(state, ownProps) {
    return {
        categories: state.categories.categories,
    };
}

const mapDispatchToProps = (dispatch, props) => {
    // Dispatch action
    return {
        getAllCategories: (params) => {
            const categories = dispatch(getAllCategories(params));
            categories.payload.then((response) => {
                !response.error ?
                    dispatch(getAllCategoriesSuccess(response.data)) :
                    dispatch(getAllCategoriesFailed(response.data));
            });
        }
    }
};

const CreateProductForm = connect(mapStateToProps, mapDispatchToProps)(CreateForm);

export default CreateProductForm;