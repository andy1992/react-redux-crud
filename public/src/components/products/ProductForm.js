import React from 'react';
import Loader from '../../components/layouts/Loader';
import { Link, browserHistory } from 'react-router';

class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            price: '',
            description: '',
            category_id: -1,
            successCreation: null
        };

        this.onSave = this.onSave.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onCategoryChanged = this.onCategoryChanged.bind(this);
        this.onPriceChanged = this.onPriceChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentWillMount() {
        if(!this.props.isLoggedIn) {
            browserHistory.push('/');
        } else {
            this.props.resetStatus();
            if (this.props.params.productId)
                this.props.findProduct(this.props.params.productId);
            this.props.getAllCategories();
            this.setState({
                successCreation: null
            });
        }
    }

    componentDidMount() {
    }

    onNameChanged(e) {
        this.setState({
            name: e.target.value
        });
    }

    onCategoryChanged(e) {
        this.setState({
            category_id: e.target.value
        });
    }

    onPriceChanged(e) {
        this.setState({
            price: e.target.value
        });
    }

    onDescriptionChanged(e) {
        this.setState({
            description: e.target.value
        });
    }

    onSave(e) {
        this.props.storeProduct(this.state);
        e.preventDefault();
    }

    componentWillReceiveProps(props) {
        if(props.params.productId) {
            if(props.successCreation == null) {
                if (props.product) {
                    this.setState({
                        id: props.product.id,
                        name: props.product.name,
                        description: props.product.description,
                        category_id: props.product.category_id,
                        price: props.product.price
                    });
                }
            }
        } else
            this.props.setPageTitle('Add New Product');

        this.setState({
            successCreation: props.successCreation
        });

        // Set form title for edit form, after receiving product properties
        if(this.state.successCreation != false && props.params.productId) {
            this.props.setPageTitle('Edit Product - ' + this.state.name);
        }

        if(props.successCreation == true)
            this.resetForm();
    }

    resetForm() {
        if(!this.props.params.productId) {
            this.setState({
                name: '',
                price: '',
                description: '',
                category_id: -1
            });
        }
    }

    render() {
        let categoriesOptions = [];
        if(this.props.categories) {
            categoriesOptions = this.props.categories.map(function (category) {
                return (
                    <option key={category.id} value={category.id}>{category.name}</option>
                );
            });
        }

        // return the goddamn form
        return (
            <div>
                <Loader isLoading={this.props.loading} />
                {
                    this.state.successCreation ?
                        (
                            this.state.successCreation == true ?
                            <div className="alert alert-success">
                                Product was saved.
                            </div>
                            :
                            <div className="alert alert-danger">
                                {this.state.successCreation}
                            </div>
                        )
                    : null
                }
                <form onSubmit={this.onSave}>
                    <table className="table table-bordered table-hover">
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    onChange={this.onNameChanged}
                                    value={this.state.name}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Price ($)</td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    required
                                    onChange={this.onPriceChanged}
                                    value={this.state.price}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>
                                <select
                                    className="form-control"
                                    onChange={this.onCategoryChanged}
                                    value={this.state.category_id}
                                >
                                    <option value="-1">Select category...</option>
                                    {categoriesOptions}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        required
                                        onChange={this.onDescriptionChanged}
                                        value={this.state.description} >
                                    </textarea>
                            </td>
                        </tr>

                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={this.onSave}>
                                    Save
                                </button>
                                &nbsp;&nbsp;
                                <Link to="/" className="btn btn-default">
                                    Back
                                </Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default ProductForm;