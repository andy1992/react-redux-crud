import React from 'react';
import { Link } from 'react-router';
import Loader from './../../components/layouts/Loader';

export default class SingleProduct extends React.Component {
    componentWillMount() {
        this.props.findProduct(this.props.params.productId);
    }

    render() {
        this.props.setPageTitle(this.props.product.name);
        return(
            <div>
                <Loader isLoading={this.props.loading} />

                <Link to={'/'} className="btn btn-primary margin-bottom-1em">
                    Back
                </Link>

                <table className="table table-bordered table-responsive">
                    <tbody>
                    <tr>
                        <td>Description</td>
                        <td>{this.props.product.description}</td>
                    </tr>
                    <tr>
                        <td>Price ($)</td>
                        <td>{this.props.product.price}</td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td>{this.props.product.category_name}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}