import React from 'react';
import { ReduxForm, SubmissionError, Field } from 'redux-form';

class CreateProduct extends React.Component {

    componentWillMount() {
        this.props.getAllCategories();
        this.props.setPageTitle('Add New Product');
    }

    onSave() {

    }

    /*componentWillReceiveProps(props) {

    }*/

    render() {
        let categoriesOptions = [];
        if(this.props.categories) {
            categoriesOptions = this.props.categories.map(function (category) {
                return (
                    <option key={category.id} value={category.id}>{category.name}</option>
                );
            });
        }

        return (
            <div>
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
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Description</td>
                            <td>
                                    <textarea
                                        className="form-control"
                                        required>
                                    </textarea>
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
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Category</td>
                            <td>
                                <select
                                    className="form-control"
                                >
                                    <option value="-1">Select category...</option>
                                    {categoriesOptions}
                                </select>
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
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default CreateProduct;