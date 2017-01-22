import React from 'react';
import { Link } from 'react-router';

class ProductRow extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        // TODO finish the checkbox checking methods
        this.setState({
            checked: e.target.checked
        });
        if(e.target.checked)
            this.props.addSelectedProduct(this.props.product.id);
        else
            this.props.removeSelectedProduct(this.props.product.id);
    }

    componentWillReceiveProps(props) {
        //console.log(props);
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (props.checked !== this.state.checked) {
            this.setState({ checked: props.checked });
        }
    }

    render() {
        const display = (this.props.isLoggedIn) ? '' : 'none';
        return (
            <tr>
                {
                    (this.props.isLoggedIn)
                    ?
                        <td>
                            <input type="checkbox"
                                   className='checkboxes' onChange={this.onChange} checked={this.state.checked} />
                        </td>
                    : null
                }
                <td>{this.props.product.name}</td>
                <td>{this.props.product.description}</td>
                <td>${parseFloat(this.props.product.price).toFixed(2)}</td>
                <td>{this.props.product.category_name}</td>
                <td>
                    <Link to={'/view/' + this.props.product.id}
                       className="btn btn-info m-r-1em">
                        Read
                    </Link>
                    {
                        (this.props.isLoggedIn)
                            ?
                            <Link to={'/product/edit/' + this.props.product.id}
                                  className="btn btn-primary m-r-1em">
                                Edit
                            </Link>
                            : null
                    }
                    <button style={{display:display}} onClick={() => this.props.deleteSelected([this.props.product.id])} className="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

export default ProductRow;